import React from 'react'
import { Button } from '@material-ui/core'


type FileUploadButtonProps = {
  name: string
}

export default class FileUploadButton extends React.Component<FileUploadButtonProps, { fileUploadState: string }> {

  state = { fileUploadState: '' }
  inputReference: React.RefObject<HTMLInputElement> = React.createRef()

  fileUploadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ fileUploadState: e.target.value })
  }

  fileUploadAction = () => this.inputReference.current.click()

  render(): JSX.Element {
    return (
      <div>
        <input name="resume" type="file" hidden ref={this.inputReference} onChange={this.fileUploadInputChange} />
        <Button type="button" onClick={this.fileUploadAction}>
          Resume
        </Button>
        {this.state.fileUploadState}
        </div>
    )
  }
}
