import React from 'react'


const styles: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {

}

function WidgetIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <circle cx="7.5" cy="24.5" r="7.5" fill="#FA759E"></circle>
      <circle cx="24.5" cy="7.5" r="7.5" fill="#164176"></circle>
    </svg>
  )
}


export default () => {
  const [open, setOpen] = React.useState(false)

  return (
    <div
      className="widget-container"
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
      }}
    >
      <WidgetIcon open={open} />
    </div>
  )
}

