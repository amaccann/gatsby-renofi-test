import React from 'react'
import {Box} from 'rebass';

import {Router} from '@reach/router';

const Category = ({category, ...props}) => {
  return (
    <Box>Sub category "{category}"</Box>
  );
};
const LPage = ({serverData, ...props}) => {
  return (
    <Box p={[3]}>
      <Box as="h4">Testing L categories</Box>
      <Router>
        <Category path="/l/:category" />
      </Router>
    </Box>
  )
}

export default LPage;


export const Head = (props) => {
  const category = props?.params?.['*'] || '';

  return (
   <>
     <title>RenoFi: {category}</title>
   </>
 );
}
