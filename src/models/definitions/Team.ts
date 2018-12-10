import {
  Typegoose,
  prop,
  Ref,
  arrayProp,
  staticMethod,
  ModelType,
  instanceMethod,
  InstanceType,
} from 'typegoose';
import Player from './Player';
import { PlayerModel } from '..';

class Team extends Typegoose {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  photo: string;

  @prop({ required: true, ref: Player })
  captain: Ref<Player>;

  @arrayProp({ required: true, itemsRef: Player })
  players: Ref<Player>[];

  @staticMethod
  static async findAndUpdate(this: ModelType<Team>, _id: string, update: any) {
    try {
      return await this.findOneAndUpdate({ _id }, update, { new: true });
    } catch (e) {
      throw e;
    }
  }

  @instanceMethod
  async findAllPlayers(this: InstanceType<Team>) {
    try {
      const players = (await PlayerModel.find({ _id: { $in: this.players } })) as InstanceType<
        Player
      >[];
      players.push((await PlayerModel.findById(this.captain)) as InstanceType<Player>);
      return players;
    } catch (e) {
      throw e;
    }
  }
}

export default Team;
