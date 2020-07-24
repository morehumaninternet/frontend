import React from 'react'
import WidgetIcon from './icon'
import Editor from './editor'
import ButtonGroup from './button-group'


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
          padding: open ? 50 : 14,
          paddingBottom: open ? 50 : 8,
          paddingRight: open ? 50 : 10,
          backgroundColor: 'white',
          boxShadow: '2px 2px 5px',
          height: open ? '100vh' : 'auto',
          width: open ? 500 : 'auto',
          position: 'relative',
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
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            <Editor
              issueTitle={issueTitle}
              setIssueTitle={setIssueTitle}
            />
            <ButtonGroup />
          </div>
        )}
      </div>
    </div>
  )
}

