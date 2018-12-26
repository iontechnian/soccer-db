import User from './definitions/User';
import Player from './definitions/Player';
import Team from './definitions/Team';
import { Typegoose } from 'typegoose';
import { SchemaOptions } from 'mongoose';

const schema: { schemaOptions: SchemaOptions } = { schemaOptions: { timestamps: true } };

// tslint:disable:variable-name
export const UserModel = new User().getModelForClass(User, schema);
export const PlayerModel = new Player().getModelForClass(Player, schema);
export const TeamModel = new Team().getModelForClass(Team, schema);
