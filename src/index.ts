import { Test1Application } from './application';
import { ApplicationConfig } from '@loopback/core';

import OASGraph = require('oasgraph');
import express = require('express');
import graphqlHTTP = require('express-graphql');

export { Test1Application };

export async function main(options: ApplicationConfig = {}) {
  const app = new Test1Application(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  try {
    const { schema } = await OASGraph.createGraphQlSchema(
      app.restServer.getApiSpec(),
      {
        strict: false,
        viewer: true,
        addSubOperations: true,
        sendOAuthTokeninQuery: false,
      },
    );
    //let's create graphql server
    const myExpress = express();
    myExpress.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }));
    myExpress.listen(3001, () => {
      console.log('OASGraph ready at http://localhost:3001/graphql');
    });
  } catch (err) {
    console.log('Error: ', err.message);
  }

  return app;
}
