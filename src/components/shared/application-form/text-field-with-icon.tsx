// tslint:disable:no-expression-statement no-class no-this
import React from 'react'

import { TextField, TextFieldProps } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'

const styles = {
  root: {
    transition: '0.2s',
  },
  formControl: {
    left: 42,
    top: 1,
  },
  shrink: {
    left: 0,
    top: 0,
  },
  disabled: {},
}

type TextFieldWithIconProps = TextFieldProps & {
  endIcon?: React.ReactNode
  startIcon?: React.ReactNode
  inputRef?: React.MutableRefObject<HTMLInputElement>
  classes?: any
  label?: string
}

class TextFieldWithIcon extends React.Component<TextFieldWithIconProps, { shrink: boolean }> {
  state = { shrink: false }

  shrinkLabel = (event: any) => {
    this.setState({ shrink: true })
    this.props.onFocus?.(event)
  }

  unShrinkLabel = (event: any) => {
    if (event.target.value.length === 0) {
      this.setState({ shrink: false })
    }
    this.props.onBlur?.(event)
  }

  render(): JSX.Element {
    const { classes, endIcon, autoComplete, startIcon, inputRef, label, ...other } = this.props

    return (
      <TextField
        {...other}
        label={label}
        onFocus={this.shrinkLabel}
        onBlur={this.unShrinkLabel}
        InputLabelProps={{ shrink: this.state.shrink, classes }}
        InputProps={{
          autoComplete,
          inputRef,
          startAdornment: startIcon && <InputAdornment position="start">{startIcon}</InputAdornment>,
          endAdornment: endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>,
          inputProps: {
            'aria-label': label,
          },
        }}
      />
    )
  }
}

export default withStyles(styles)(TextFieldWithIcon)
