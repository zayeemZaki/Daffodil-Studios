export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, email, subject, organization, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid email format'
      })
    }

    // Map subject codes to readable text
    const subjectMap: Record<string, string> = {
      'screening-request': 'Screening Request',
      'general-inquiry': 'General Inquiry',
      'partnership': 'Partnership Opportunity',
      'press': 'Press/Media Inquiry',
      'other': 'Contact Form'
    }

    const subjectText = subjectMap[subject] || 'Contact Form'
    
    // Format email content
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; }
    .value { margin-top: 5px; color: #1f2937; }
    .message-box { background: white; padding: 15px; border-left: 4px solid #f59e0b; margin-top: 10px; }
    .footer { background: #1f2937; color: #9ca3af; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">📧 New Contact Form Submission</h2>
      <p style="margin: 5px 0 0 0; opacity: 0.9;">Daffodil Studios Website</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Subject Type</div>
        <div class="value">${subjectText}</div>
      </div>
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      ${organization ? `
      <div class="field">
        <div class="label">Organization/Venue</div>
        <div class="value">${organization}</div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      <p>This email was sent from the Daffodil Studios contact form</p>
      <p>Reply directly to this email to respond to ${name}</p>
    </div>
  </div>
</body>
</html>
    `.trim()

    // For now, we'll use Resend API
    // You'll need to set RESEND_API_KEY in your .env file
    const config = useRuntimeConfig()
    const resendApiKey = config.resendApiKey

    if (!resendApiKey) {
      // Fallback: Return success but log that email service isn't configured
      console.log('Email would be sent:', { name, email, subject: subjectText, organization, message })
      return {
        success: true,
        message: 'Form submitted successfully (email service not configured)'
      }
    }

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Daffodil Studios <noreply@daffodilstudios.org>',
        to: ['contact@daffodilstudios.org'],
        reply_to: email,
        subject: `${subjectText} - ${name}`,
        html: emailContent
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw createError({
        statusCode: 500,
        message: 'Failed to send email: ' + (error.message || 'Unknown error')
      })
    }

    return {
      success: true,
      message: 'Your message has been sent successfully!'
    }

  } catch (error: any) {
    console.error('Contact form error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to send message'
    })
  }
})
