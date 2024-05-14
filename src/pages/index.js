import * as React from 'react'
import {Box, Image, Text} from 'rebass';

import useSiteMetadata from '../hooks/useSiteMetadata'
import {Router} from '@reach/router';
import { graphql } from 'gatsby';
import { get } from 'lodash';

const IndexPage = ({serverData, ...props}) => {
  const {contractor, urlSlug} = serverData || {};
  console.log('serverData', serverData);
  console.log('props', props);
  return (
    <Box p={[3]}>
      <Box as="h4">Root</Box>
      <p>urlSlug: {urlSlug}</p>
      <Box as="p">{contractor?.businessName}</Box>
    </Box>
  )
}

export default IndexPage;

export const Head = ({serverData, ...props}) => {
  const {contractor} = serverData || {};
  const {description, twitterUsername} = useSiteMetadata();
  const title = contractor ? `RenoFi and ${contractor.businessName}` : 'RenoFi - Home Renovation Financing';

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

const QUERY_CONTRACTOR_LOGO_BY_SLUG = `
  query getContractorBySlug($urlSlug: String!) {
    contractorBySlug(urlSlug: $urlSlug) {
      businessName
      logoUrl
      daasPrice
    }
  }
`;

function gqlQuery (query) {
  return async ({path, variables} = {}) => {
    let req;
    try {
      req = await fetch(process.env.GATSBY_GRAPHQL_PROXY_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({query: query, variables}),
      });
      const rsp = await req.json();
      return path ? get(rsp, path) : rsp;
    } catch (err) {
      return err;
    }
  }
};

export async function getServerData({query, ...props}) {
  const urlSlug = query?.contractor;
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