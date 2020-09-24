// TODO: typecheck, perhaps rely on a library
export function issueFromJson(issueJson: string): Issue {
  const issue = JSON.parse(issueJson)

  issue.initialReport.timestamp = new Date(issue.initialReport.timestamp) // tslint:disable-line:no-expression-statement
  for (const activity of issue.timeline) {
    activity.timestamp = new Date(activity.timestamp) // tslint:disable-line:no-expression-statement
  }
  return issue
}
