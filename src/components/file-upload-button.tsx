import React from 'react'
import { last } from 'lodash'
import { CloudUpload, Close } from '@material-ui/icons'
import { Button } from '@material-ui/core'


type FileUploadButtonProps = {
  name: string
  label: React.ReactNode
  style?: React.CSSProperties
  onNewFileName?: (fileName: null | string) => void
}

const fileNameOf = (filePath: null | string) =>
  filePath && last(filePath.split(/(\/|\\)/))

export default class FileUploadButton extends React.Component<FileUploadButtonProps, { fileName: null | string }> {

  state = { fileName: null }
  inputReference: React.RefObject<HTMLInputElement> = React.createRef()

  setFileName = (fileName: null | string) => {
    this.setState({ fileName })
    if (this.props.onNewFileName) this.props.onNewFileName(fileName)
  }

  fileUploadInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setFileName(fileNameOf(event.target.value))
  }

  onClick = () => {
    if (this.state.fileName) {
      this.inputReference.current.value = ''
      this.setFileName(null)
    } else {
      this.inputReference.current.click()
    }
  }

  render(): JSX.Element {
    return (
      <div className="file-upload-button-container">
        <input name={this.props.name} type="file" hidden ref={this.inputReference} onChange={this.fileUploadInputChange} />
        <Button type="button" onClick={this.onClick}>
          {this.state.fileName || this.props.label} &nbsp;&nbsp;{this.state.fileName ? <Close /> : <CloudUpload/>}
        </Button>
      </div>
    )
  }
}
