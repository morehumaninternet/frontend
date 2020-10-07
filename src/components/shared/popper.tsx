import React from 'react'
import { ClickAwayListener, Popper as MUIPopper } from '@material-ui/core'

type PopperProps = {
  message: string
  position:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'
}

const Popper: React.FC<PopperProps> = ({ children, message, position }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // tslint:disable-next-line: no-expression-statement
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    // tslint:disable-next-line: no-expression-statement
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  return (
    <>
      {React.Children.map(children, child => {
        return React.cloneElement(child as React.ReactElement<any>, { onClick: handleClick })
      })}
      <MUIPopper placement={position} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClose}>
          <div className="popper" dangerouslySetInnerHTML={{ __html: message }} />
        </ClickAwayListener>
      </MUIPopper>
    </>
  )
}

export default Popper
