import { graphql, useStaticQuery } from "gatsby"

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitterUsername
          siteUrl
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata;