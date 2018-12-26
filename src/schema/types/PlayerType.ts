import { ObjectType, registerEnumType, Field, Int, ID } from 'type-graphql';
import TeamType from './TeamType';

export enum Role {
  CAPTAIN = 'captain',
  PLAYER = 'player',
}

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
class PlayerType {
  @Field(type => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(type => Int)
  age: number;

  @Field()
  photo: string;

  @Field(type => Role)
  role: Role;

  @Field(type => TeamType, { nullable: true })
  team: TeamType;
}

export default PlayerType;
