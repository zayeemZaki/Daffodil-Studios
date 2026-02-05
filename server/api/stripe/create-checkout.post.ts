import Stripe from 'stripe'
import screeningsData from '~/data/screenings.json'
import { assertRateLimit } from '~/server/utils/rateLimit'

type ScreeningRecord = {
  id: number
  ticketUrl?: string
  ticketPrice?: number
}

export default defineEventHandler(async (event) => {
  assertRateLimit(event, { windowMs: 10 * 60 * 1000, max: 20, keyPrefix: 'checkout' })

  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Validate required fields
  if (!body.screeningId || !body.amount || !body.screeningName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: screeningId, amount, and screeningName are required'
    })
  }

  try {
    const screeningId = Number(body.screeningId)
    const amount = Number(body.amount)

    if (!Number.isFinite(screeningId) || !Number.isFinite(amount) || amount <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid screening or amount'
      })
    }

    const screening = (screeningsData as unknown as ScreeningRecord[]).find((item) => item.id === screeningId)
    if (!screening || screening.ticketUrl !== 'stripe' || !screening.ticketPrice) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Screening is not eligible for Stripe checkout'
      })
    }

    if (amount !== screening.ticketPrice) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid ticket amount'
      })
    }

    // Initialize Stripe
    const stripe = new Stripe(config.stripeSecretKey as string, {
      apiVersion: '2025-10-29.clover'
    })

    // Get the origin from the request headers for proper URL construction
    const originHeader = getRequestHeader(event, 'origin')
    const allowedOrigins = [config.public.siteUrl]
    const origin = originHeader && allowedOrigins.includes(originHeader) ? originHeader : config.public.siteUrl
    
    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: body.screeningName,
              description: `Screening at ${body.location || 'selected venue'}`,
              images: body.image ? [body.image] : []
            },
            unit_amount: amount * 100 // Convert dollars to cents
          },
          quantity: body.quantity || 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1
          }
        }
      ],
      mode: 'payment',
      success_url: `${origin}/success?type=ticket&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/canceled?type=ticket`,
      // Collect customer email for receipt and tickets
      customer_email: body.email || undefined,
      billing_address_collection: 'auto',
      // Enable Stripe to send receipt emails automatically
      payment_intent_data: {
        receipt_email: body.email || undefined
      },
      metadata: {
        screeningId: body.screeningId.toString(),
        type: 'ticket_purchase'
      }
    })

    return {
      success: true,
      sessionId: session.id,
      url: session.url
    }
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to create checkout session'
    })
  }
})
