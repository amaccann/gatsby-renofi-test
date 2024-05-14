export default`
  query getContractorBySlug($urlSlug: String!) {
    contractorBySlug(urlSlug: $urlSlug) {
      businessName
      logoUrl
      daasPrice
    }
  }
`;
