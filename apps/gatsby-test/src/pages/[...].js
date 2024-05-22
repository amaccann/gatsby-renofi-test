import * as React from 'react'
import {Box, Image, Text} from 'rebass';

import {QUERY_CONTRACTOR_LOGO_BY_SLUG, gqlQuery} from '../utils'
import useSiteMetadata from '../hooks/useSiteMetadata'
import {Router} from '@reach/router';

const Contractor = ({serverData, urlSlug, ...props}) => {
  const {contractor} = serverData || {};
  console.log('serverData', serverData);
  console.log('props', props);
  return (
    <Box p={[3]}>
      {Boolean(contractor) ? (
        <Box as="h3">
        Welcome to {contractor?.businessName} of {contractor?.city}, {contractor?.state}
        </Box>
      ) : null}
      <Image src={contractor.logoUrl} width={250} />
      <p>urlSlug: {urlSlug}</p>
    </Box>
  );
}

const IndexPage = ({serverData, ...props}) => {
  return (
    <Router>
      <Contractor path="/:urlSlug" serverData={serverData} />
    </Router>
  );
}

export default IndexPage;

export const Head = ({serverData, ...props}) => {
  const {contractor} = serverData || {};
  const {description, twitterUsername} = useSiteMetadata();
  let title;
  if (!contractor) {
    title = 'RenoFi - Home Renovation Financing';
  } else {
    title = `RenoFi and ${contractor.businessName} of ${contractor.city}, ${contractor.state}`;
  }
  
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

export async function getServerData({query, ...props}) {
  const urlSlug = props?.params?.['*']
  // const urlSlug = query?.contractor;
  if (!urlSlug) {
    return {
      status: 200,
      props: {},
    };

  }
  try {
    const path = ['data', 'contractorBySlug'];
    const contractor = await gqlQuery(QUERY_CONTRACTOR_LOGO_BY_SLUG)({path, variables: {urlSlug}})
    console.log('contractor', contractor);

    // if (!res.ok) {
    //   throw new Error(`Response failed`)
    // }

    return {
      props: {
        contractor,
        urlSlug,
      },
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {}
    }
  }
}