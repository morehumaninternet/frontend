import React from 'react'
import { MHIHomeLink } from '../mhi-dots-logo'


const BuiltWith = (): JSX.Element => {
  return (
    <div className="built-with">
      <h4>
        Built with
        <svg width="33" height="17" viewBox="0 0 20 19" fill="none">
          <path
            d="M14.5 0C11.605 0 10 2.09 10 2.09C10 2.09 8.395 0 5.5 0C2.462 0 0 2.462 0 5.5C0 9.671 4.912 13.713 6.281 14.99C7.858 16.46 10 18.35 10 18.35C10 18.35 12.142 16.46 13.719 14.99C15.088 13.713 20 9.671 20 5.5C20 2.462 17.538 0 14.5 0Z"
            fill="#FA759E"
          />
        </svg>
        by the team at
      </h4>

      <MHIHomeLink />
    </div>
  )
}

export default BuiltWith
