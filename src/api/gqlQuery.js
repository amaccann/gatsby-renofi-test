import { get } from 'lodash';

export default function gqlQuery (query) {
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
