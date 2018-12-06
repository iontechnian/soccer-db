import { InputType, Field, ID, Int } from 'type-graphql';

import Player, { Role } from '../types/Player';

@InputType()
class PlayerInput implements Partial<Player> {
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
}

@InputType()
export class PlayerInputOptional implements Partial<Player> {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field(type => Int, { nullable: true })
  age: number;

  @Field({ nullable: true })
  photo: string;

  @Field(type => Role, { nullable: true })
  role: Role;
}

export default PlayerInput;
