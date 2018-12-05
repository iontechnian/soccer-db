import { Router } from 'express';
import * as passport from 'passport';
import User from '../../models/definitions/User';
import { InstanceType } from 'typegoose';
import requires from '../../middleware/requires';

const app = Router();

app.post(
  '/',
  requires({
    body: ['email', 'password'],
  }),
  (req, res) => {
    passport.authenticate('local', (err, user: InstanceType<User>) => {
      if (err) {
        return res.status(400).json({ success: false, message: err });
      }
      return res.json({ success: true, message: user.getJWT() });
    })(req, res);
  },
);

export default app;
