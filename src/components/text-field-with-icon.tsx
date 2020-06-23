import React from "react"

import { TextField, TextFieldProps } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import InputAdornment from '@material-ui/core/InputAdornment'

const styles = theme => ({
  formControl: {
      left: 30, // this moves our label to the left, so it doesn't overlap when shrunk.
      top: 0,
  },
  disabled: {},
})

type TextFieldWithIconProps = TextFieldProps & {
  endIcon?: React.ReactNode
  startIcon?: React.ReactNode
}

class TextFieldWithIcon extends React.Component<TextFieldWithIconProps, { shrink: boolean }> {

  state = { shrink: false }

  shrinkLabel = (event) => {
    const { onFocus } = this.props
    this.setState({ shrink: true })
    onFocus && onFocus(event) // let the child do it's thing
  }

  unShrinkLabel = (event) => {
    const { onBlur } = this.props
    if (event.target.value.length === 0) {
      this.setState({ shrink: false }) //gotta make sure the input is empty before shrinking the label
    }
    onBlur && onBlur(event) // let the child do it's thing
  }

  render() {
    // make sure to check endIcon and startIcon, we don't need errors in our console
    const { classes, endIcon, autoComplete, startIcon, ...other } = this.props
    return <TextField {...other}
      onFocus={this.shrinkLabel}
      onBlur={this.unShrinkLabel}
      InputLabelProps={{shrink: this.state.shrink, classes: classes }}
      InputProps={{
        autoComplete,
        endAdornment: endIcon && (
          <InputAdornment position={"end"}>
            {endIcon}
          </InputAdornment>
        ),
        startAdornment: startIcon && (
          <InputAdornment position={"start"}>
            {startIcon}
          </InputAdornment>
        )}}
    />
  }
}

export default withStyles(styles)(TextFieldWithIcon as any) as typeof TextFieldWithIcon
