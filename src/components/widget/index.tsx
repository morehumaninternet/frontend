import React from 'react'
import WidgetIcon from './icon'



type WidgetIssueProps = {
  issueTitle: string
  setIssueTitle(issueTitle: string): void
}

function WidgetIssue({ issueTitle, setIssueTitle }: WidgetIssueProps): JSX.Element {
  return (
    <p
      style={{
        backgroundColor: 'inherit',
      }}
    >
      Expanded
    </p>
  )
}

function hasParent(possibleChild: HTMLElement, possibleParent: HTMLElement) {
  let test: null | HTMLElement = possibleChild

  while (test) {
    if (test === possibleParent) return true
    test = test.parentElement
  }

  return false
}

export default () => {
  const widgetRef = React.useRef<HTMLDivElement>()

  const [open, setOpen] = React.useState(false)
  const [issueTitle, setIssueTitle] = React.useState('')

  React.useEffect(() => {
    function listener(event: MouseEvent) {
      if (!hasParent(event.target as any, widgetRef.current!)) setOpen(false)
    }

    document.addEventListener('click', listener)

    return () => document.removeEventListener('click', listener)
  })

  return (
    <div
      className="widget-boundary"
      ref={widgetRef as any}
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
      }}
    >
      <div
        className="widget-container"
        style={{
          borderTopLeftRadius: 30,
          padding: 14,
          paddingBottom: 8,
          paddingRight: 8,
          backgroundColor: 'white',
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          style={{
            borderWidth: 0,
            padding: 0,
            backgroundColor: 'inherit',
            cursor: 'pointer',
          }}
        >
          <WidgetIcon open={open} />
        </button>
        {open && (
          <WidgetIssue
            issueTitle={issueTitle}
            setIssueTitle={setIssueTitle}
          />
        )}
      </div>
    </div>
  )
}

