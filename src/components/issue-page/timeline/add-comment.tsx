// tslint:disable:no-expression-statement
import React from 'react'
import { Avatar, Button } from '@material-ui/core'

export type IssueAddCommentProps = {
  avatarUrl?: string
  actionInProgress: boolean
  postComment(comment: { html: string }): void
}

export default function IssueAddComment({ avatarUrl, actionInProgress, postComment }: IssueAddCommentProps): JSX.Element {
  const ref: React.MutableRefObject<HTMLDivElement> = React.useRef() as any
  const [hasText, setHasText] = React.useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const commentHtml: string = (event.target as any).elements.namedItem('comment').value
    postComment({ html: commentHtml })
    const trixElement: any = ref.current!.querySelector('trix-editor')!
    trixElement.editor.loadHTML('')
  }

  React.useEffect(() => {
    ref.current!.querySelector('input')
    const editorElement = ref.current!.querySelector('trix-editor') as any
    editorElement.addEventListener('trix-change', (event: { target: { value: string } }) => {
      setHasText(!!event.target.value)
    })
  }, [])

  return (
    <form className="issue-add-comment" onSubmit={onSubmit}>
      <Avatar src={avatarUrl} />
      <div
        className="issue-add-comment-editor"
        ref={ref}
        dangerouslySetInnerHTML={{
          __html: `
            <input id="add-comment-input" type="hidden" name="comment" required>
            <trix-editor input="add-comment-input" aria-label="add comment"></trix-editor>
          `,
        }}
      />
      <Button className="mhi-button" type="submit" disabled={actionInProgress || !hasText}>
        Add Comment
      </Button>
    </form>
  )
}
