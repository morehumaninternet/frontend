// tslint:disable:no-expression-statement no-let
import { expect } from 'chai'
import * as sinon from 'sinon'
import { createStore, IssuePageStore } from '../stores/issue-page'
import backgroundScript from '../background-scripts/issue-page'

describe('issue-page store & background-script', () => {
  let store: IssuePageStore
  let api: {
    defaultSite: 'goalco.com'
    postIssue: sinon.SinonStub
    getSiteData: sinon.SinonStub
    getIssueBySiteAndId: sinon.SinonStub
    postComment: sinon.SinonStub
    changeStatus: sinon.SinonStub
    searchIssues: sinon.SinonStub
  }

  beforeEach(() => {
    store = createStore()
    api = {
      defaultSite: 'goalco.com',
      postIssue: sinon.stub().throws(),
      getSiteData: sinon.stub().throws(),
      getIssueBySiteAndId: sinon.stub().throws(),
      postComment: sinon.stub().throws(),
      changeStatus: sinon.stub().throws(),
      searchIssues: sinon.stub().throws(),
    }
    backgroundScript(store, api)
  })

  function pageLoad(search: string): void {
    store.dispatch({
      type: 'PAGE_LOAD',
      payload: { search },
    })
  }

  it('starts with a blank state', () => {
    const expectedState: IssuePageState = {
      actionInProgress: null,
      currentUser: {
        loaded: false,
      },
      error: null,
      issueState: {
        loading: true,
      },
      params: {
        state: 'checking',
      },
    }
    expect(store.getState()).to.eql(expectedState)
  })

  describe('on PAGE_LOAD', () => {
    it('detects that the query params are not ok if they do not include site', () => {
      pageLoad('?id=6')
      expect(store.getState().params).to.eql({
        state: 'not ok',
        error: 'query param `site` is required',
      })
    })

    it('detects that the query params are not ok if they do not include id', () => {
      pageLoad('?site=foo.com')
      expect(store.getState().params).to.eql({
        state: 'not ok',
        error: 'query param `id`, an integer, is required',
      })
    })

    it('detects that the query params are not ok if id is not an integer', () => {
      pageLoad('?site=foo.com&id=6.23')
      expect(store.getState().params).to.eql({
        state: 'not ok',
        error: 'query param `id`, an integer, is required',
      })
    })

    it('fetches the corresponding issue when the query params include site & an integer id', async () => {
      const getIssueBySiteAndId = Promise.resolve({ some: 'issue' })

      api.getIssueBySiteAndId.returns(getIssueBySiteAndId)

      pageLoad('?site=foo.com&id=6')

      expect(api.getIssueBySiteAndId).to.have.callCount(1)
      expect(api.getIssueBySiteAndId.firstCall.args).to.eql(['foo.com', 6])

      await getIssueBySiteAndId

      const expectedState: IssuePageState = {
        actionInProgress: null,
        currentUser: {
          loaded: true,
          user: {
            username: 'sillywalks',
            avatarUrl: 'https://github.com/will-weiss.png?size=71',
          },
        },
        error: null,
        issueState: {
          loading: false,
          issue: { some: 'issue' } as any,
        },
        params: {
          state: 'ok',
          params: { site: 'foo.com', issueId: 6 },
        },
      }

      expect(store.getState()).to.eql(expectedState)
    })
  })
})
