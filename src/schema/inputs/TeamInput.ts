import { InputType, Field, ID, Int } from 'type-graphql';

import Team from '../types/Team';
import PlayerInput from './PlayerInput';
import Player from '../types/Player';

@InputType()
class TeamInput {
  @Field()
  name: string;

  @Field()
  photo: string;

  @Field()
  captain: string;

  @Field()
  players: string[];
}

@InputType()
export class TeamInputOptional implements Partial<Team> {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  photo: string;

  @Field(type => PlayerInput, { nullable: true })
  captain: Player;

  @Field(type => [PlayerInput], { nullable: true })
  players: Player[];
}

export default TeamInput;
