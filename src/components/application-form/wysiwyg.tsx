import React from 'react'


type WYSIWYGProps = {
  name: string
  placeholder?: string
  onAttachment(event: Event & { attachment: { file: any } }): void
}


export default function WYSIWYG({ name, placeholder, onAttachment }: WYSIWYGProps): JSX.Element {

  React.useEffect(() => {
    const trixEditor = document.querySelector(`trix-editor[input="input-${name}"]`)
    window.addEventListener('trix-attachment-add', function(event: any) {
      if (event.target === trixEditor) {
        onAttachment && onAttachment(event)
      }
    })
  })

  return (
    <div id={`trix-editor-container-${name}`} dangerouslySetInnerHTML={{
      __html: `
        <input type="hidden" name="${name}" id="input-${name}">
        <trix-editor input="input-${name}" placeholder="${placeholder}"></trix-editor>
      `
    }}/>
  )
}
