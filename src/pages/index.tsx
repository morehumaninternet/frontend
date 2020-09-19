import { graphql } from 'gatsby'
import LandingPage from '../components/landing-page'


export default LandingPage

export const squareImage = graphql`
  fragment squareImage on File {
    childImageSharp {
      fixed(width: 55, height: 55, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    willAvatar: file(relativePath: { eq: "will-weiss.jpg" }) {
      ...squareImage
    }
    signature: file(relativePath: { eq: "signature.png" }) {
      ...squareImage
    }
  }
`
