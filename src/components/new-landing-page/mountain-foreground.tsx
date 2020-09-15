import * as React from 'react'

export default function MountainForeground(): JSX.Element {
  return (
    <svg
      viewBox="0 0 1440 397"
      fill="none"
      className="mountain-foreground"
      preserveAspectRatio="none"
    >
      <path
        d="M231.751 165.522L3.162 2.259C1.777 1.269 1.085.775.542 1.054 0 1.334 0 2.184 0 3.886V394.5c0 .943 0 1.414.293 1.707.293.293.764.293 1.707.293h568.301c.943 0 1.414 0 1.707-.293.293-.293.293-.764.293-1.707V234.339c0-.649 0-.973-.169-1.226-.169-.252-.469-.376-1.069-.623l-210.666-86.775c-.259-.107-.389-.16-.526-.176-.138-.016-.276.006-.553.051l-126.087 20.28h-.001c-.4.064-.6.096-.792.051-.192-.045-.357-.163-.687-.399z"
        fill="url(#mountain-foreground_paint0_linear)"
      />
      <path
        d="M618.067 166.609L358.4 392.992c-1.689 1.473-2.534 2.21-2.291 2.859.244.649 1.364.649 3.605.649H1438c.94 0 1.41 0 1.71-.293.29-.293.29-.764.29-1.707V41.596c0-1.395 0-2.092-.46-2.388-.45-.295-1.09-.008-2.36.565L1141.14 173.31c-.27.119-.4.179-.54.199-.14.02-.29-.001-.57-.043L997.401 152.63a1.984 1.984 0 00-.247-.028 2.099 2.099 0 00-.249.018l-284.376 29.633a1.863 1.863 0 01-.276.019 1.957 1.957 0 01-.274-.038l-92.255-16.087c-.461-.081-.692-.121-.91-.06-.218.061-.394.215-.747.522z"
        fill="url(#mountain-foreground_paint1_linear)"
      />
      <defs>
        <linearGradient id="mountain-foreground_paint0_linear" x1={435.349} y1={-16} x2={33.3284} y2={449.862} gradientUnits="userSpaceOnUse">
          <stop stopColor="#164176" />
          <stop offset={1} stopColor="#164176" />
        </linearGradient>
        <linearGradient id="mountain-foreground_paint1_linear" x1={997.654} y1={163.072} x2={254.475} y2={387.122} gradientUnits="userSpaceOnUse">
          <stop stopColor="#164176" />
          <stop offset={1} stopColor="#164176" />
        </linearGradient>
      </defs>
    </svg>
  )
}
