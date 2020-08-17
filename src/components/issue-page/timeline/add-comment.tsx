import React from 'react'
import { Avatar } from '@material-ui/core'


export type IssueAddCommentProps = {
  postComment(comment: { html: string }): Promise<void>
}

export default function IssueAddComment({ postComment }: IssueAddCommentProps): JSX.Element {
  const ref: React.MutableRefObject<HTMLDivElement> = React.useRef() as any
  const [submitting, setSubmitting] = React.useState(false)

  return (
    <form className="issue-add-comment" onSubmit={(event: any) => {
      event.preventDefault()
      const commentHtml: string = event.target.elements.namedItem('comment').value
      console.log('commentHtml', commentHtml)
      setSubmitting(true)
      postComment({ html: commentHtml }).then(result => {
        const trixElement: any = ref.current!.querySelector('trix-editor')!
        trixElement.editor.loadHTML('')
        setSubmitting(false)
      })
      .catch(err => {
        // TODO: something else
        alert(err)
      })
    }}>
      <Avatar src="https://github.com/will-weiss.png?size=71"/>
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
      <button disabled={submitting}>
        Comment
      </button>
    </form>
  )
}
