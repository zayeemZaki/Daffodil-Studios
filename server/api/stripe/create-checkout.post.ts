import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
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
    // Initialize Stripe
    const stripe = new Stripe(config.stripeSecretKey as string, {
      apiVersion: '2025-10-29.clover'
    })

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
            unit_amount: body.amount * 100 // Convert dollars to cents
          },
          quantity: body.quantity || 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1
          }
        }
      ],
      mode: 'payment',
      success_url: `${body.successUrl || config.public.siteUrl}/success?type=ticket&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${body.cancelUrl || config.public.siteUrl}/screenings?canceled=true`,
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
