import { Typegoose, prop, Ref, arrayProp } from 'typegoose';
import Player from './Player';

class Team extends Typegoose {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  photo: string;

  @prop({ required: true, ref: Player })
  captain: Ref<Player>;

  @arrayProp({ required: true, itemsRef: Player })
  players: Ref<Player>[];
}

export default Team;
