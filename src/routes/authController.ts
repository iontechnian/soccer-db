import { Controller, Post, Middleware, Get } from '@overnightjs/core';
import requires from '../middleware/requires';
import { Request, Response } from 'express';
import { UserModel } from '../models';
import withAuth from '../middleware/withAuth';
import User from '../models/definitions/User';
import { InstanceType } from 'typegoose';
import passport = require('passport');

@Controller('auth')
export class AuthController {
  @Post('register')
  @Middleware(requires({ body: ['firstName', 'lastName', 'email', 'username', 'password'] }))
  private async register(req: Request, res: Response) {
    const { firstName, lastName, email, username, password } = req.body;
    try {
      const user = new UserModel({
        firstName,
        lastName,
        email,
        username,
        isAdmin: true,
      });

      await user.generateHash(password);
      await user.save();

      return res.json({
        success: true,
        message: await user.getJWT(),
      });
    } catch (e) {
      return res.status(500).json({ success: false, message: e });
    }
  }

  @Get('currentUser')
  @Middleware(withAuth)
  private currentUser(req: Request, res: Response) {
    const user = req.user as InstanceType<User>;
    return res.json({ success: true, message: user.getUserSafe() });
  }

  @Post('login')
  @Middleware(
    requires({
      body: ['email', 'password'],
    }),
  )
  private login(req: Request, res: Response) {
    passport.authenticate('local', (err, user: InstanceType<User>) => {
      if (err) {
        return res.status(400).json({ success: false, message: err });
      }
      return res.json({ success: true, message: user.getJWT() });
    })(req, res);
  }
}
