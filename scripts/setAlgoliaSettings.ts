/**
 * Set Algolia settings
 */

const fs = require('fs')
const chalk = require('chalk')
const { config } = require('dotenv')
const { difference, keys } = require('lodash')
const algoliasearch = require('algoliasearch')

// Validate that env file exists
const envFilePath = `${__dirname}/../.env.development`
const { parsed: existingEnvVars } = config({
  path: envFilePath,
})
if (existingEnvVars === undefined) {
  throw new Error(chalk.red('Missing env file .env.development'))
}

// Validate that all env variables are configured
const requiredEnvVars: ReadonlyArray<string> = ['GATSBY_ALGOLIA_APP_ID', 'ALGOLIA_API_KEY', 'GATSBY_ALGOLIA_INDEX_NAME']
const missingEnvVars = difference(requiredEnvVars, keys(existingEnvVars))
if (missingEnvVars.length > 0) {
  throw new Error(chalk.red(`Missing environment variable(s): ${missingEnvVars.join(' ,')}`))
}

// Configure Algolia
const algoliaApiId = process.env.GATSBY_ALGOLIA_APP_ID
const algoliaApiKey = process.env.ALGOLIA_API_KEY
const algoliaIndexName = process.env.GATSBY_ALGOLIA_INDEX_NAME
const client = algoliasearch(algoliaApiId, algoliaApiKey)
const index = client.initIndex(algoliaIndexName)
// tslint:disable-next-line: no-expression-statement
index
  .setSettings({
    searchableAttributes: ['title', 'site'],
    attributesForFaceting: ['filterOnly(site)'],
  })
  .then(() => {
    // tslint:disable-next-line: no-expression-statement
    console.log(chalk.green('Done'))
  })
