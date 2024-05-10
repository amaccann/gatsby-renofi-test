import * as React from "react"
import { graphql } from "gatsby"
import { Box } from 'rebass'

import '../index.css';
import useSiteMetadata from '../hooks/useSiteMetadata';

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Box p={3}>
      <div>
        <h1>{frontmatter.title}</h1>
        <h3>{frontmatter.date}</h3>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Box>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`

export const Head = ({data}) => {
  const {title, description, twitterUsername} = useSiteMetadata();
  const { frontmatter, html } = data?.markdownRemark || {};
  console.log('data', data);

  return (
    <>
      <title>{frontmatter?.title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content={twitterUsername} />
      <link rel="canonical" href="https://www.renofi.com/pros/test/blah" />
    </>
  );
}
