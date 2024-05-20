export default`
  query getContractorBySlug($urlSlug: String!) {
    contractorBySlug(urlSlug: $urlSlug) {
      businessName
      city
      logoUrl
      daasPrice
      state
    }
  }
`;
