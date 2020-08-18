import React from 'react'
import { Avatar, Button } from '@material-ui/core'


export type IssueAddCommentProps = {
  avatarUrl?: string
  postComment(comment: { html: string }): Promise<void>
}

export default function IssueAddComment({ avatarUrl, postComment }: IssueAddCommentProps): JSX.Element {
  const ref: React.MutableRefObject<HTMLDivElement> = React.useRef() as any
  const [submitting, setSubmitting] = React.useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const commentHtml: string = (event.target as any).elements.namedItem('comment').value
    setSubmitting(true)
    postComment({ html: commentHtml })
      .then(() => {
        const trixElement: any = ref.current!.querySelector('trix-editor')!
        trixElement.editor.loadHTML('')
        setSubmitting(false)
      })
      .catch(err => {
        // TODO: something else
        alert(err)
      })
  }

  return (
    <form className="issue-add-comment" onSubmit={onSubmit}>
      <Avatar src={avatarUrl} />
      <div
        className="issue-add-comment-editor"
        ref={ref}
        dangerouslySetInnerHTML={{
          __html: `
            <input id="add-comment-input" type="hidden" name="comment" required>
            <trix-editor input="add-comment-input"></trix-editor>
          `
        }}
      />
      <Button type="submit" disabled={submitting}>
        Add Comment
      </Button>
    </form>
  )
}
