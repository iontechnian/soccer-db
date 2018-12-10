import { Typegoose, prop, staticMethod, ModelType, Ref } from 'typegoose';
import Team from './Team';

enum Role {
  CAPTAIN = 'captain',
  PLAYER = 'player',
}

class Player extends Typegoose {
  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true, min: 15 })
  age: number;

  @prop({ required: true })
  photo: string;

  @prop({ required: true, enum: Role })
  role: Role;

  @prop()
  team?: string;

  @staticMethod
  static async findAndUpdate(this: ModelType<Player>, _id: string, update: any) {
    try {
      return await this.findOneAndUpdate({ _id }, update, { new: true });
    } catch (e) {
      throw e;
    }
  }
}

export default Player;
