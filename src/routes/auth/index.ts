import { Router } from 'express';
const app = Router();

import register from './register';
import currentUser from './currentUser';
import login from './login';

app.use('/register', register);
app.use('/currentUser', currentUser);
app.use('/login', login);

export default app;
