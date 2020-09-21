// tslint:disable:no-expression-statement no-let
import { expect } from 'chai'
import * as sinon from 'sinon'
import { omit } from 'lodash'
import { createIssue } from '../clients/mockApi'
import { createStore, IssuePageStore } from '../stores/issue-page'
import backgroundScript from '../background-scripts/issue-page'
import { whenState } from './util'

describe('issue-page store & background-script', () => {
  let store: IssuePageStore
  let api: {
    defaultSite: 'goalco.com'
    createIssue: sinon.SinonStub
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
      createIssue: sinon.stub().throws(),
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
      const issue: Issue = createIssue({ id: 6 })

      api.getIssueBySiteAndId.returns(Promise.resolve(issue))

      pageLoad('?site=foo.com&id=6')

      expect(api.getIssueBySiteAndId).to.have.callCount(1)
      expect(api.getIssueBySiteAndId.firstCall.args).to.eql(['foo.com', 6])

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
        issueState: { loading: false, issue },
        params: {
          state: 'ok',
          params: { site: 'foo.com', issueId: 6 },
        },
      }

      expect(await whenState(store, state => state.params.state === 'ok')).to.eql(expectedState)
    })
  })

  describe('on CHANGE_STATUS_INITIATE', () => {
    it('optimistically updates the issue timeline, then completes the action when the call to api.changeStatus resolves', async () => {
      api.getIssueBySiteAndId.returns(Promise.resolve(createIssue({ id: 6 })))
      api.changeStatus.returns(Promise.resolve())

      pageLoad('?site=foo.com&id=6')

      const stateBeforeChangeStatusInitiate = await whenState(store, state => state.params.state === 'ok')

      const changeStatusInitiate: IssuePageAction = {
        type: 'CHANGE_STATUS_INITIATE',
        payload: {
          user: { username: 'foo' },
          status: 'acknowledged',
          comment: { html: '<div>Indubitably</div>' },
        },
      }

      store.dispatch(changeStatusInitiate)

      const stateAfterChangeStatusInitiate = store.getState()

      expect(stateAfterChangeStatusInitiate.issueState.issue?.timeline).to.have.length(4)
      expect(stateAfterChangeStatusInitiate.issueState.issue?.timeline[2]).to.deep.include({
        verb: 'comment',
        by: { username: 'foo' },
        comment: { html: '<div>Indubitably</div>' },
      })
      expect(stateAfterChangeStatusInitiate.issueState.issue?.timeline[3]).to.deep.include({
        verb: 'change status',
        by: { username: 'foo' },
        status: 'acknowledged',
      })

      expect(stateAfterChangeStatusInitiate.actionInProgress).to.eql({
        priorState: stateBeforeChangeStatusInitiate,
        action: changeStatusInitiate,
      })

      const stateAfterChangeStatusResolves = await whenState(store, state => !state.actionInProgress)

      expect(stateAfterChangeStatusResolves.actionInProgress).to.equal(null)
      expect(omit(stateAfterChangeStatusResolves, 'actionInProgress')).to.eql(omit(stateAfterChangeStatusInitiate, 'actionInProgress'))
    })
  })

  describe('on POST_COMMENT_INITIATE', () => {
    it('optimistically updates the issue timeline, then completes the action when the call to api.changeStatus resolves', async () => {
      api.getIssueBySiteAndId.returns(Promise.resolve(createIssue({ id: 6 })))
      api.postComment.returns(Promise.resolve())

      pageLoad('?site=foo.com&id=6')

      const stateBeforePostCommentInitiate = await whenState(store, state => state.params.state === 'ok')

      const PostCommentInitiate: IssuePageAction = {
        type: 'POST_COMMENT_INITIATE',
        payload: {
          user: { username: 'foo' },
          comment: { html: '<div>Indubitably</div>' },
        },
      }

      store.dispatch(PostCommentInitiate)

      const stateAfterPostCommentInitiate = store.getState()

      expect(stateAfterPostCommentInitiate.issueState.issue?.timeline).to.have.length(3)
      expect(stateAfterPostCommentInitiate.issueState.issue?.timeline[2]).to.deep.include({
        verb: 'comment',
        by: { username: 'foo' },
        comment: { html: '<div>Indubitably</div>' },
      })

      expect(stateAfterPostCommentInitiate.actionInProgress).to.eql({
        priorState: stateBeforePostCommentInitiate,
        action: PostCommentInitiate,
      })

      const stateAfterPostCommentResolves = await whenState(store, state => !state.actionInProgress)

      expect(stateAfterPostCommentResolves.actionInProgress).to.equal(null)
      expect(omit(stateAfterPostCommentResolves, 'actionInProgress')).to.eql(omit(stateAfterPostCommentInitiate, 'actionInProgress'))
    })
  })
})
