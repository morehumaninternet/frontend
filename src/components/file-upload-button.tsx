import React from 'react'
import { last } from 'lodash'
import { CloudUpload } from '@material-ui/icons'
import { Button } from '@material-ui/core'


type FileUploadButtonProps = {
  name: string
  label: React.ReactNode
  style?: React.CSSProperties
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const fileName = (filePath: null | string) =>
  filePath && last(filePath.split(/(\/|\\)/))

export default class FileUploadButton extends React.Component<FileUploadButtonProps, { fileName: null | string }> {

  state = { fileName: null }
  inputReference: React.RefObject<HTMLInputElement> = React.createRef()

  fileUploadInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ fileName: fileName(event.target.value) })
    if (this.props.onChange) this.props.onChange(event)
  }

  fileUploadAction = () => this.inputReference.current.click()

  render(): JSX.Element {
    return (
      <div className="file-upload-button-container">
        <input name={this.props.name} type="file" hidden ref={this.inputReference} onChange={this.fileUploadInputChange} />
        <Button type="button" onClick={this.fileUploadAction}>
          <CloudUpload/> &nbsp;&nbsp; {this.state.fileName || this.props.label}
        </Button>
      </div>
    )
  }
}
