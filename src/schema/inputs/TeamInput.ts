import { InputType, Field, ID, Int } from 'type-graphql';

import Player from '../types/Player';

class TeamInput {
  @Field()
  name: string;

  @Field()
  photo: string;

  @Field(type => Player)
  captain: Player;

  @Field(type => [Player])
  players: Player[];
}

export class TeamInputOptional {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  photo: string;

  @Field(type => Player, { nullable: true })
  captain: Player;

  @Field(type => [Player], { nullable: true })
  players: Player[];
}

export default TeamInput;
