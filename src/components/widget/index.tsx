import React from 'react'
import WidgetIcon from './icon'
import TitleInput from './title-input'
import CommentInput from './comment-input'
import SimilarIssues from './similar-issues'
import ButtonGroup from './button-group'
import hasParent from '../../utils/hasParent'
import { createStore, WidgetStore } from '../../stores/widget'
import subscribe from '../../background-scripts/widget'
import { handleTour } from './handleTour'

type WidgetWithStoreProps = {
  tour?: any
  store: WidgetStore
}

type WidgetWithStateProps = {
  tour: any
  state: WidgetState
  openWidget(): void
  closeWidget(): void
  setIssueTitle(title: string): void
  setIssueInitialCommentHtml(html: string): void
  clickIsNewIssue(): void
  postIssue(): void
}

type WidgetProps = {
  tour: any
  siteOrigin: string
  navigate: (href: string) => void
  api: {
    postIssue(issue: {
      id?: number
      user?: User
      site: string
      title: string
      initialCommentHtml: string
      aggregates?: IssueAggregates
      status?: IssueStatus
    }): Promise<Issue>
    searchIssues(opts: { site: string; title?: string }): Promise<ReadonlyArray<Issue>>
  }
}

function WidgetWithState({
  state,
  openWidget,
  closeWidget,
  setIssueTitle,
  setIssueInitialCommentHtml,
  clickIsNewIssue,
  postIssue,
}: WidgetWithStateProps): JSX.Element {
  const ref = React.useRef<HTMLDivElement>()

  const { open, actionInProgress, editingIssue: issue, similarIssues, isNewIssue } = state

  const postingIssue = !!actionInProgress && actionInProgress.action.type === 'POST_ISSUE_INITIATE'
  const searchingSimilarIssues = !!actionInProgress && actionInProgress.action.type === 'SIMILAR_ISSUES_SEARCH_INITIATE'

  const anyIssueTitle = !!issue.title
  const issueTitleLongEnoughToSearchFor = issue.title.length > 5
  const issueTitleLongEnoughToSubmit = issue.title.length > 9

  const reasonCantPostAsNewIssue = searchingSimilarIssues
    ? 'Searching for similar issues'
    : !issueTitleLongEnoughToSubmit
    ? 'Issue title must be longer'
    : similarIssues.length > 3
    ? 'Too many similar issues, please refine the title'
    : null

  // tslint:disable:no-expression-statement
  React.useEffect(() => {
    function listener(event: MouseEvent): void {
      if (!hasParent(event.target as any, ref.current!) && !hasParent(event.target as any, '.shepherd-content')) {
        closeWidget() // tslint:disable-line:no-expression-statement
      }
    }

    document.addEventListener('click', listener) // tslint:disable-line:no-expression-statement

    return () => document.removeEventListener('click', listener)
  })
  // tslint:enable:no-expression-statement

  return (
    <div className="more-human-internet-widget-boundary" ref={ref as any} onClick={() => !open && openWidget()}>
      <div
        className={`more-human-internet-widget-container ${open ? 'more-human-internet-widget-container-open' : 'more-human-internet-widget-container-closed'}`}
      >
        <WidgetIcon open={open} />
        <div className="more-human-internet-widget-editor-container" style={{ display: open ? undefined : 'none' }}>
          <div className="more-human-internet-widget-editor">
            {postingIssue ? (
              <div className="submitting">
                Submitting issue...
                <br />
                You will be redirected shortly
              </div>
            ) : (
              <>
                <TitleInput setIssueTitle={setIssueTitle} />
                {isNewIssue ? (
                  <CommentInput setIssueInitialCommentHtml={setIssueInitialCommentHtml} />
                ) : (
                  <SimilarIssues
                    anyIssueTitle={anyIssueTitle}
                    issueTitleLongEnoughToSubmit={issueTitleLongEnoughToSubmit}
                    issueTitleLongEnoughToSearchFor={issueTitleLongEnoughToSearchFor}
                    similarIssuesState={{
                      similarIssues,
                      searching: searchingSimilarIssues,
                    }}
                  />
                )}
              </>
            )}
          </div>
          {!postingIssue && (
            <ButtonGroup isNewIssue={isNewIssue} reasonCantPostAsNewIssue={reasonCantPostAsNewIssue} clickIsNewIssue={clickIsNewIssue} postIssue={postIssue} />
          )}
        </div>
      </div>
    </div>
  )
}

function WidgetWithStore({ tour, store }: WidgetWithStoreProps): JSX.Element {
  const [state, setState] = React.useState<WidgetState>(store.getState())

  // tslint:disable:no-expression-statement
  React.useEffect(() => {
    return store.subscribe(() => setState(store.getState()))
  }, [])

  handleTour(tour, state)
  // tslint:enable:no-expression-statement

  return (
    <WidgetWithState
      tour={tour}
      state={state}
      openWidget={() => store.dispatch({ type: 'OPEN_WIDGET' })}
      closeWidget={() => store.dispatch({ type: 'CLOSE_WIDGET' })}
      setIssueTitle={title => store.dispatch({ type: 'UPDATE_ISSUE_TITLE', payload: { title } })}
      setIssueInitialCommentHtml={html => store.dispatch({ type: 'UPDATE_ISSUE_COMMENT_HTML', payload: { html } })}
      clickIsNewIssue={() => store.dispatch({ type: 'CLICK_IS_NEW_ISSUE' })}
      postIssue={() => {
        if (tour) {
          tour.cancel() // tslint:disable-line:no-expression-statement
        }
        return store.dispatch({ type: 'POST_ISSUE_INITIATE' })
      }}
    />
  )
}

export default ({ tour, siteOrigin, navigate, api }: WidgetProps): null | JSX.Element => {
  const [store, setStore] = React.useState<null | WidgetStore>(null)

  // tslint:disable:no-expression-statement
  React.useEffect(() => {
    const s = createStore()
    subscribe(s, api, siteOrigin, navigate)
    setStore(s)
  }, [])
  // tslint:enable:no-expression-statement

  return store && <WidgetWithStore tour={tour} store={store} />
}
