import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}));
app.use(bodyparser.json({ limit: '1mb' }));

app.use(routes);

app.listen(process.env.PORT);
