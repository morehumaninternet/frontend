// tslint:disable:no-expression-statement
import { expect } from 'chai'
import sinon from 'sinon'
import rewire from 'rewire'
// rewire is used to monkeypatch imported function - algoliasearch in this case
const postIssueModule = rewire('../../functions/postIssue')

describe('Post issue function', () => {
  beforeEach('Mock Algolia', () => {
    // Mocking the environment variable required for Algolia
    process.env['GATSBY_ALGOLIA_APP_ID'] = 'fake app ID'
    process.env['ALGOLIA_API_KEY'] = 'fake API key'
    process.env['GATSBY_ALGOLIA_INDEX_NAME'] = 'fake index name'

    // Mocking algoliasearch
    const fakeAlgoliasearch = () => ({
      initIndex: () => ({
        saveObject: () => ({
          wait: sinon.stub(),
        }),
      }),
    })

    // We're using "rewire" to set the algoliasearch function inside postIssue to be our fake function
    postIssueModule.__set__('algoliasearch', fakeAlgoliasearch)
  })

  afterEach(() => {
    sinon.restore()
  })

  const invalidHTTPMethods: readonly string[] = ['GET', 'PUT', 'DELETE']
  invalidHTTPMethods.map(async HTTPMethod => {
    it(`should return 405 for invalid HTTP method ${HTTPMethod}`, async () => {
      const invalidInput = {
        httpMethod: HTTPMethod,
      }
      const result = await postIssueModule.handler(invalidInput)
      expect(result.statusCode).to.eq(405)
    })
  })

  it('should return 200 for valid issue input', async () => {
    const validRequestBody =
      '{"objectID":736,"title":"testing","site":"http://localhost:8888","status":"opened","initialReport":{"by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z"},"aggregates":{"upvotes":{"count":1},"comments":{"count":1}},"timeline":[{"verb":"change status","by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z","status":"opened"},{"verb":"comment","by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z","comment":{"html":"\\n  <strong>Steps</strong>\\n"}}]}'
    const result = await postIssueModule.handler({
      httpMethod: 'POST',
      body: validRequestBody,
    })
    expect(result.statusCode).to.eq(200)
  })

  const invalidInputs: readonly {
    description: string
    input: string
  }[] = [
    {
      description: 'missing objectID',
      input:
        '{"title":"testing","site":"http://localhost:8888","status":"opened","initialReport":{"by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z"},"aggregates":{"upvotes":{"count":1},"comments":{"count":1}},"timeline":[{"verb":"change status","by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z","status":"opened"},{"verb":"comment","by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z","comment":{"html":"\\n  <strong>Steps</strong>\\n"}}]}',
    },
    {
      description: 'invalid status',
      input:
        '{"objectID":736,"title":"testing","site":"http://localhost:8888","status":"ugly","initialReport":{"by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z"},"aggregates":{"upvotes":{"count":1},"comments":{"count":1}},"timeline":[{"verb":"change status","by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z","status":"opened"},{"verb":"comment","by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z","comment":{"html":"\\n  <strong>Steps</strong>\\n"}}]}',
    },
    {
      description: 'unknown attribute',
      input:
        '{"secret": "1234","objectID":736,"title":"testing","site":"http://localhost:8888","status":"opened","initialReport":{"by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z"},"aggregates":{"upvotes":{"count":1},"comments":{"count":1}},"timeline":[{"verb":"change status","by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z","status":"opened"},{"verb":"comment","by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z","comment":{"html":"\\n  <strong>Steps</strong>\\n"}}]}',
    },
    {
      description: 'issue activity with both status and comment',
      input:
        '{"objectID":736,"title":"testing","site":"http://localhost:8888","status":"opened","initialReport":{"by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z"},"aggregates":{"upvotes":{"count":1},"comments":{"count":1}},"timeline":[{"verb":"change status","by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z","status":"opened"},{"verb":"comment","by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z","status":"closed","comment":{"html":"\\n  <strong>Steps</strong>\\n"}}]}',
    },
    {
      description: 'empty JSON',
      input: '{}',
    },
  ]
  invalidInputs.map(invalidInput => {
    it(`should return 422 for invalid issue input - ${invalidInput.description}`, async () => {
      const result = await postIssueModule.handler({
        httpMethod: 'POST',
        body: invalidInput.input,
      })
      expect(result.statusCode).to.eq(422)
    })
  })

  it('should return 500 for missing environment variables', async () => {
    delete process.env.GATSBY_ALGOLIA_INDEX_NAME
    const result = await postIssueModule.handler({
      httpMethod: 'POST',
      body: '{}',
    })
    expect(result.statusCode).to.eq(500)
  })

  it('should return 500 when algoliasearch throws an error', async () => {
    const fakeAlgoliasearch = () => ({
      initIndex: () => ({
        saveObject: () => ({
          // "wait" throws an error when called
          wait: sinon.stub().throws(),
        }),
      }),
    })
    postIssueModule.__set__('algoliasearch', fakeAlgoliasearch)

    const result = await postIssueModule.handler({
      httpMethod: 'POST',
      body:
        '{"objectID":736,"title":"testing","site":"http://localhost:8888","status":"opened","initialReport":{"by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z"},"aggregates":{"upvotes":{"count":1},"comments":{"count":1}},"timeline":[{"verb":"change status","by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z","status":"opened"},{"verb":"comment","by":{"username":"sillywalks","avatarUrl":"https://github.com/will-weiss.png?size=71"},"timestamp":"2020-09-26T11:31:38.762Z","comment":{"html":"\\n  <strong>Steps</strong>\\n"}}]}',
    })
    expect(result.statusCode).to.eq(500)
  })
})
