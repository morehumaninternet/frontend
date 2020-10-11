import React from 'react'

const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  //   const includeInDevelopment = !!pluginOptions.includeInDevelopment
  //   const isEnabled = includeInDevelopment || process.env.NODE_ENV === 'production'

  //   if (!isEnabled) {
  //     return null
  //   }

  const options = {
    src: 'http://142.93.15.154/umami.js',
    'data-website-id': 'e8c8631c-8552-4888-8506-b05681b04dfa',
    'data-auto-track': true,
    'data-do-not-track': true,
  }

  return setHeadComponents([<script key="gastby-plugin-umami" async defer {...options} />])
}

export { onRenderBody }
