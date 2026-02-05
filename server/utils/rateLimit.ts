type RateLimitOptions = {
  windowMs: number
  max: number
  keyPrefix?: string
}

type RateLimitEntry = {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

const getClientIp = (event: any): string => {
  const forwardedFor = getRequestHeader(event, 'x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }
  return event.node?.req?.socket?.remoteAddress || 'unknown'
}

export const assertRateLimit = (event: any, options: RateLimitOptions) => {
  const { windowMs, max, keyPrefix = 'rate' } = options
  const ip = getClientIp(event)
  const key = `${keyPrefix}:${ip}`
  const now = Date.now()

  const entry = rateLimitStore.get(key)
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    return
  }

  if (entry.count >= max) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please try again later.'
    })
  }

  entry.count += 1
  rateLimitStore.set(key, entry)
}
