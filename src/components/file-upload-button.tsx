import React from 'react'
import { Button } from '@material-ui/core'


type FileUploadButtonProps = {
  name: string
  style?: React.CSSProperties
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
      <div className="file-upload-button-container">
        <input name="resume" type="file" hidden ref={this.inputReference} onChange={this.fileUploadInputChange} />
        <Button type="button" onClick={this.fileUploadAction}>
          {this.props.children}
        </Button>
        {this.state.fileUploadState}
      </div>
    )
  }
}
