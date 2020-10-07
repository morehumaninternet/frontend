import React from 'react'
import { ClickAwayListener, Popper as MUIPopper } from '@material-ui/core'

type PopperProps = {
  message: string
}

const Popper: React.FC<PopperProps> = ({ children, message }) => {
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
      <MUIPopper placement="top" open={open} anchorEl={anchorEl} disablePortal>
        <ClickAwayListener onClickAway={handleClose}>
          <div className="popper">{message}</div>
        </ClickAwayListener>
      </MUIPopper>
    </>
  )
}

export default Popper
