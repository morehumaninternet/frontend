import React from 'react'
import Layout from '../components/shared/layout'
import SEO, { defaultLinks } from '../components/shared/seo'
import Hero from '../components/shared/hero'
import { Avatar } from '@material-ui/core'
import * as mockApi from '../clients/mockApi'
import setLogoFade from '../utils/setLogoFade'
import LoadedIssue from '../components/issue-page'



type IssueStateLoading = { loading: true }
type IssueStateLoaded = { loading: false, issue: Maybe<Issue> }
type IssueState =  IssueStateLoading | IssueStateLoaded

function useIssue(
  props: { location: { search: string } },
  api: typeof mockApi
): { issueState: IssueState } {

  const [issueState, setIssueState] = React.useState<IssueState>({ loading: true })

  React.useEffect(() => {

    const params = new URLSearchParams(props.location.search)

    const site = params.get('site')

    // TODO: redirect and show a toaster in this case instead of throwing an
    if (!site) throw new Error('site required in query params')
    const issueId = parseInt(params.get('id')!)

    if (!issueId) throw new Error('issueId integer required in query params')

    api.getIssueBySiteAndId(site, issueId).then(issue => {
      setIssueState({ loading: false, issue })
    })
  }, [props.location.search])

  return {
    issueState
  }
}

export default function IssuePage(props: { location: { search: string } }): JSX.Element {

  React.useEffect(() => setLogoFade(1), [])

  const { issueState } = useIssue(props, mockApi)

  return (
    <Layout
      mainClassName="issue"
      logoAgainstHero={false}
      headerLinks={
        <Avatar
          src="github.com/will-weiss.png"
        />
      }
    >
      <SEO
        pageTitle="Issue"
        links={defaultLinks.concat([
          { rel: "stylesheet", type: "text/css", href: "/trix.css" },
        ])}
        scripts={[
          { type: "text/javascript", src: "/trix.js" },
        ]}
      />
      <Hero additionalClassNames="issue">
        {issueState.loading
          ? <p>Loading...</p>
          : <LoadedIssue issue={issueState.issue! /* TODO: handle issues not present */} />}
      </Hero>
    </Layout>
  )
}
