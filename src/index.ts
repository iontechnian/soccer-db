import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as ExpressGraphQL from 'express-graphql';

import schema from './schema';
import routes from './routes';

mongoose.connect(
  process.env.DB_URI as string,
  { useNewUrlParser: true, useCreateIndex: true },
);

require('./configs/passport');

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  }),
);
app.use(bodyparser.json({ limit: '1mb' }));

app.use(routes);
app.use(ExpressGraphQL(schema));

app.listen(process.env.PORT, () => {
  console.log('Express Ready');
});
