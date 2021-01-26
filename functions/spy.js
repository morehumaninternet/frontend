const Wappalyzer = require('wappalyzer')

const options = {
  debug: false,
  delay: 0,
  headers: {},
  maxDepth: 2,
  maxUrls: 10,
  maxWait: 5000,
  recursive: true,
  probe: true,
  userAgent: 'Wappalyzer',
  htmlMaxCols: 2000,
  htmlMaxRows: 2000,
}

const wappalyzer = new Wappalyzer(options)

exports.handler = async event => {
  const params = event.queryStringParameters
  const url = params && params.url

  if (!url) {
    return { statusCode: 422, body: JSON.stringify({ message: 'Missing attribute - url' }) }
  }
  let technology_names
  try {
    await wappalyzer.init()

    // Optionally set additional request headers
    const headers = {}
    const site = await wappalyzer.open(url, headers)

    // Optionally capture and output errors
    site.on('error', console.error)
    const results = await site.analyze()

    const technologies = results.technologies
    const analytics_technologies = technologies.filter(tech => {
      return tech.categories.some(category => category.name === 'Analytics')
    })
    technology_names = analytics_technologies.map(tech => tech.name)
    console.log(JSON.stringify(technology_names, null, 2))
  } catch (error) {
    console.error(error)
    return { statusCode: 400, body: JSON.stringify({ message: 'something went wrong' }) }
  }
  await wappalyzer.destroy()
  return { statusCode: 200, body: JSON.stringify({ spies: technology_names }) }
}

// TODO - convert all response to JSON. Should errors be in 'body'?
