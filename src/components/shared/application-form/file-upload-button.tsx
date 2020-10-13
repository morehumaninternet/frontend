// tslint:disable:no-expression-statement no-class no-this
import React from 'react'
import { last } from 'lodash'
import { CloudUpload, Close } from '@material-ui/icons'

type FileUploadButtonProps = {
  name: string
  label: React.ReactNode
  style?: React.CSSProperties
  onNewFileName?: (fileName: Maybe<string>) => void
}

const fileNameOf = (filePath: Maybe<string>) => filePath && last(filePath.split(/(\/|\\)/))

export default class FileUploadButton extends React.Component<FileUploadButtonProps, { fileName: Maybe<string> }> {
  state = { fileName: null }
  inputReference: React.RefObject<HTMLInputElement> = React.createRef()

  setFileName = (fileName: Maybe<string>) => {
    this.setState({ fileName })
    this.props.onNewFileName?.(fileName)
  }

  fileUploadInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setFileName(fileNameOf(event.target.value))
  }

  onClick = () => {
    if (this.state.fileName) {
      this.inputReference.current!.value = ''
      this.setFileName(null)
    } else {
      this.inputReference.current!.click()
    }
  }

  render(): JSX.Element {
    return (
      <div className="file-upload-button-container">
        <input name={this.props.name} type="file" hidden ref={this.inputReference} onChange={this.fileUploadInputChange} />
        <button type="button" className="mhi-button" onClick={this.onClick}>
          {this.state.fileName ? <Close className="close" /> : <CloudUpload />}
          <span style={{ marginLeft: 8 }}>{this.state.fileName || this.props.label}</span>
        </button>
      </div>
    )
  }
}
