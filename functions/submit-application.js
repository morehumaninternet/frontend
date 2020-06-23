exports.handler = async (event, context, callback) => {
  console.log(event)
  console.log(context)

  callback(null, {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: 'yay' })
  })
}