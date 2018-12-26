import { Server } from '@overnightjs/core';
import * as bodyParser from 'body-parser';
import { AuthController } from './authController';

export class RoutesServer extends Server {
  constructor() {
    super();

    this.setupExpress();
  }

  private setupExpress() {
    this.app_.use(bodyParser.json());
    this.app_.use(bodyParser.urlencoded({ extended: true }));

    const controllers = this.setupControllers();
    super.addControllers_(controllers);
  }

  private setupControllers(): any[] {
    const authController = new AuthController();

    return [authController];
  }
}
