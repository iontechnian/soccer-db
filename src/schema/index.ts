import { Options, OptionsData } from 'express-graphql';
import { Request, Router } from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

import PlayerResolver from './resolvers/PlayerResolver';
import TeamResolver from './resolvers/TeamResolver';

export default async function () {
  const schema = await buildSchema({
    resolvers: [PlayerResolver, TeamResolver],
  });

  const options: OptionsData = {
    schema,
    graphiql: true,
  };

  return options;
}
