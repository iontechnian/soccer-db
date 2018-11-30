import { Router } from 'express';
const app = Router();

import register from './register';

app.use('/auth', register);

export default app;
