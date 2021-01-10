const mailchimp = require('@mailchimp/mailchimp_marketing')

const { MAILCHIMP_LIST_ID, MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX } = process.env

if (!MAILCHIMP_LIST_ID || !MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX) {
  throw 'Some Mailchimp environment variables are undefined'
}

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER_PREFIX,
})

exports.handler = async event => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const params = JSON.parse(event.body)
  const email = params && params.email

  if (!email) {
    return { statusCode: 422, body: 'Missing attribute - email' }
  }

  try {
    // 'pending' status means a confirmation email will be
    // sent before adding the email to the list
    await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'pending',
    })
  } catch (error) {
    return {
      statusCode: error.status ? error.status : 400,
      body: `Failed to subscribe ${email}`,
    }
  }

  return { statusCode: 201, body: `${email} has been successfully subscribed` }
}
