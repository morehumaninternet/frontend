const algoliasearch = require('algoliasearch')
const Ajv = require('ajv')
const issueSchema = require('../schemas/issue.schema.json')

// A Netlify function to insert a new record to Algolia
exports.handler = async event => {
  // Retrieving environment variables.
  // These variable should be configured on Netlify.
  const algoliaApiId = process.env.GATSBY_ALGOLIA_APP_ID
  const algoliaApiKey = process.env.ALGOLIA_API_KEY
  const algoliaIndexName = process.env.GATSBY_ALGOLIA_INDEX_NAME
  if (!algoliaApiId || !algoliaApiKey || !algoliaIndexName) {
    return {
      statusCode: 500,
      body: 'Failed to execute function. Some environment variables are missing',
    }
  }

  // Parsing and validating request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    }
  }

  const bodyObj = JSON.parse(event.body)

  // Using JSON schema validation to validate the input
  const ajv = new Ajv()
  const validInput = ajv.validate(issueSchema, bodyObj)
  if (!validInput) {
    return {
      statusCode: 422,
      body: `Invalid input. Errors:\n${JSON.stringify(ajv.errors, null, '\t')}`,
    }
  }

  // Connecting to the Algolia service
  const client = algoliasearch(algoliaApiId, algoliaApiKey)
  const index = client.initIndex(algoliaIndexName)

  // Send the record to Algolia
  try {
    await index.saveObject(bodyObj).wait()
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
