import React from "react"

import { TextField, TextFieldProps } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import InputAdornment from '@material-ui/core/InputAdornment'

const styles = {
  root: {
    transition: '0.2s',
  },
  formControl: {
    left: 40, // this moves our label to the left, so it doesn't overlap when shrunk.
    top: 1,
  },
  shrink: {
    left: 0, // this moves our label to the left, so it doesn't overlap when shrunk.
    top: 0,
  },
  disabled: {},
}

type TextFieldWithIconProps = TextFieldProps & {
  endIcon?: React.ReactNode
  startIcon?: React.ReactNode
  inputRef?: React.MutableRefObject<HTMLInputElement>
  classes?: any
}

class TextFieldWithIcon extends React.Component<TextFieldWithIconProps, { shrink: boolean }> {

  state = { shrink: false }

  shrinkLabel = (event: any) => {
    this.setState({ shrink: true })
    this.props.onFocus?.(event)
  }

  unShrinkLabel = (event: any) => {
    if (event.target.value.length === 0) {
      this.setState({ shrink: false }) //gotta make sure the input is empty before shrinking the label
    }
    this.props.onBlur?.(event)
  }

  render() {
    // make sure to check endIcon and startIcon, we don't need errors in our console
    const { classes, endIcon, autoComplete, startIcon, inputRef, ...other } = this.props

    return <TextField {...other}
      onFocus={this.shrinkLabel}
      onBlur={this.unShrinkLabel}
      InputLabelProps={{ shrink: this.state.shrink, classes }}
      InputProps={{
        autoComplete,
        inputRef,
        startAdornment: startIcon && (
          <InputAdornment position="start">
            {startIcon}
          </InputAdornment>
        ),
        endAdornment: endIcon && (
          <InputAdornment position="end">
            {endIcon}
          </InputAdornment>
        ),
      }}
    />
  }
}

export default withStyles(styles)(TextFieldWithIcon)
