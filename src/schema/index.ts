import { Options, OptionsData } from 'express-graphql';
import { Request, Router } from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

import PlayerResolver from './resolvers/PlayerResolver';

export default async function () {
  const schema = await buildSchema({
    resolvers: [PlayerResolver],
  });

  const options: OptionsData = {
    schema,
    graphiql: true,
  };

  return options;
}
