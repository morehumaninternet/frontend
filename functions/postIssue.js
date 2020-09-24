const algoliasearch = require('algoliasearch')

// A Netlify function to insert a new record to Algolia
exports.handler = async event => {
  // Parsing and validating request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    }
  }

  const bodyJson = JSON.parse(event.body)

  // TODO - validate body arguments

  // Retrieving environment variables.
  // These variable should be configured on Netlify.
  const algoliaApiId = process.env.ALGOLIA_APP_ID
  const algoliaApiKey = process.env.ALGOLIA_API_KEY
  const algoliaIndexName = process.env.ALGOLIA_INDEX_NAME

  if (!algoliaApiId || !algoliaApiKey || !algoliaIndexName) {
    return {
      statusCode: 500,
      body: 'Failed to execute function. Some environment variables are missing',
    }
  }

  // Connecting to the Algolia service
  const client = algoliasearch(algoliaApiId, algoliaApiKey)
  const index = client.initIndex(algoliaIndexName)

  // Send the record to Algolia
  try {
    const result = index.saveObject(bodyJson).wait()
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Failed to execute function. Could not save record in the database',
    }
  }

  return {
    statusCode: 200,
    body: 'Data was posted successfully',
  }
}
