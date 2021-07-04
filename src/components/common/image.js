import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image = props => {
  const { imgId } = props
  const data = useStaticQuery(graphql`
    query {
      logoEverlywell: file(relativePath: { eq: "icons/logo/logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 210) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      tableSearchIcon: file(
        relativePath: { eq: "icons/search/icons-ui-search.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 24) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      logOutIcon: file(relativePath: { eq: "icons/account/log-out.png" }) {
        childImageSharp {
          fluid(maxWidth: 24) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      emptyDataImage: file(relativePath: { eq: "icons/no-results.png" }) {
        childImageSharp {
          fluid(maxWidth: 120) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Img fluid={data[imgId].childImageSharp.fluid} />
}

export default Image
