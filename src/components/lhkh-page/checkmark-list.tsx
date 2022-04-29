import React from 'react'

const CheckmarkIcon = () => (
  <svg className="checkmark-icon" width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M37.1641 17.5039C37.3828 18.5781 37.5 19.6914 37.5 20.832C37.5 30.0234 30.0234 37.5 20.832 37.5C11.6406 37.5 4.16406 30.0234 4.16406 20.832C4.16406 11.6406 11.6406 4.16406 20.832 4.16406C24.2344 4.16406 27.3984 5.19531 30.0391 6.95312L33.0234 3.97266C29.5898 1.48437 25.3828 0 20.832 0C9.34375 0 0 9.34375 0 20.832C0 32.3203 9.34375 41.6641 20.832 41.6641C32.3203 41.6641 41.6641 32.3203 41.6641 20.832C41.6641 18.4844 41.2578 16.2344 40.5391 14.1289L37.1641 17.5039Z" fill="#164176" />
    <path d="M41.6641 4.16406L18.75 27.082L10.4141 18.75" stroke="#164176" stroke-width="4.16667" stroke-miterlimit="10" />
  </svg>
)

const Checkmark = ({ note }: { note: string }) => (
  <div className="checkmark">
    <div className="centered">
      <CheckmarkIcon />
    </div>
    <p>{note}</p>
  </div>
)

export const CheckmarkList = ({ notes }: { notes: ReadonlyArray<string> }) => (
  <div className="checkmark-list">
    {notes.map(note => (
      <Checkmark key={note} note={note} />
    ))}
  </div>
)
