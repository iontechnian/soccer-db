import { ObjectType, Field, ID } from 'type-graphql';
import Player from './Player';

@ObjectType()
class Team {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  photo: string;

  @Field(type => Player)
  captain: Player;

  @Field(type => [Player])
  players: Player[];
}

export default Team;
