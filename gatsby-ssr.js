// Copied from gatsby-plugin-react-helmet, except apparently this is a default import now
import * as ReactHelmet from "react-helmet"

export const onRenderBody = (opts) => {
  const {
    setHeadComponents,
    setHtmlAttributes,
    setBodyAttributes,
  } = opts

  const helmet = ReactHelmet.renderStatic()

  // These action functions were added partway through the Gatsby 1.x cycle.
  if (setHtmlAttributes) {
    setHtmlAttributes(helmet.htmlAttributes.toComponent())
  }
  if (setBodyAttributes) {
    setBodyAttributes(helmet.bodyAttributes.toComponent())
  }
  setHeadComponents([
    helmet.title.toComponent(),
    helmet.link.toComponent(),
    helmet.meta.toComponent(),
    helmet.noscript.toComponent(),
    helmet.script.toComponent(),
    helmet.style.toComponent(),
    helmet.base.toComponent(),
  ])
}
