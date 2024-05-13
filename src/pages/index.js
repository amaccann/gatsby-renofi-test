import * as React from "react"
import {Box, Text} from 'rebass';

import useSiteMetadata from '../hooks/useSiteMetadata'
import {Router} from '@reach/router';

const Blah = (props) => {
  console.log('props123', props);
  return (
    <>

    <Box as="h3">Blah page</Box>
    <Box>testing testing</Box>
    </>
  );
};

const IndexPage = () => {
  return (
    <Box p={[3]}>
      <Box as="h4">Root</Box>
      <Router>
        <Blah path="/:urlSlug?" />
      </Router>
    </Box>
  )
}

export default IndexPage

export const Head = () => {
  const {title, description, twitterUsername} = useSiteMetadata();

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content={twitterUsername} />
      <link rel="canonical" href="https://www.renofi.com/pros/test/blah" />
    </>
  );
}
