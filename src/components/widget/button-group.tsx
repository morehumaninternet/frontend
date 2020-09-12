import React from 'react'
import { Button } from '@material-ui/core'
import { WidgetState } from './useWidgetState'

type ButtonGroupProps = Pick<WidgetState, 'postAsNewIssue' | 'postIssue' | 'setPostAsNewIssue' | 'reasonCantPostAsNewIssue'>

function AttachIcon(): JSX.Element {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.78039 22C4.3062 22 3.02167 21.4611 1.9268 20.3834C0.745718 19.2293 0.193973 17.88 0.271562 16.3356C0.349151 14.7911 1.03883 13.3782 2.34061 12.0968C4.47862 9.99224 6.14678 8.35443 7.34511 7.18336C8.12962 6.41113 9.06069 6.04623 10.1383 6.08865C11.1211 6.13957 11.9703 6.5172 12.6858 7.22154C13.41 7.92589 13.7936 8.75752 13.8367 9.71644C13.8798 10.7772 13.5048 11.6894 12.7117 12.4532L7.99168 17.0866L6.51749 15.6355L11.2375 11.0148C11.5996 10.6584 11.772 10.2595 11.7548 9.81827C11.7289 9.377 11.5479 8.99088 11.2116 8.65993C10.8754 8.32897 10.4832 8.15501 10.0349 8.13804C9.58657 8.11258 9.18138 8.27806 8.8193 8.63447L3.8148 13.5479C2.91821 14.4304 2.43113 15.3597 2.35354 16.3356C2.27595 17.3115 2.6251 18.177 3.40099 18.9323C4.10791 19.6366 4.93122 19.9761 5.87091 19.9506C6.90543 19.9252 7.90116 19.4415 8.85809 18.4995L15.9963 11.5112C17.2205 10.2977 17.8584 8.99513 17.9102 7.60342C17.9619 6.18624 17.4015 4.90061 16.2291 3.74651C15.0135 2.56694 13.716 2.00262 12.3367 2.05354C10.9314 2.09597 9.59088 2.73667 8.31497 3.97563L1.47419 10.6966L0 9.24547L6.84078 2.53724C8.48739 0.916407 10.2978 0.0720448 12.272 0.00415643C14.2635 -0.063732 16.0739 0.700013 17.7033 2.29539C19.324 3.89077 20.087 5.68557 19.9921 7.67979C19.9145 9.63158 19.0697 11.3882 17.4576 12.9496L10.3323 19.9379C9.00465 21.2617 7.53908 21.9491 5.93557 22H5.78039Z"
        fill="white"
      />
    </svg>
  )
}

export default function ButtonGroup({ postAsNewIssue, reasonCantPostAsNewIssue, postIssue, setPostAsNewIssue }: ButtonGroupProps): JSX.Element {
  return (
    <div className="more-human-internet-widget-editor-button-group">
      {postAsNewIssue && (
        <Button className="attach" type="button">
          <AttachIcon />
        </Button>
      )}
      {postAsNewIssue ? (
        <Button className="post" onClick={() => postIssue()}>
          Post
        </Button>
      ) : (
        <Button className="post" disabled={!!reasonCantPostAsNewIssue} onClick={() => setPostAsNewIssue(true)}>
          Post as new issue
        </Button>
      )}
    </div>
  )
}
