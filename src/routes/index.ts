import { Router } from 'express';
const app = Router();

import auth from './auth';

app.use('/auth', auth);

export default app;
