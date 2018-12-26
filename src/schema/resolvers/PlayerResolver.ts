import { Resolver, Query, Arg, Mutation, FieldResolver, Root } from 'type-graphql';
import PlayerType from '../types/PlayerType';

import { PlayerModel, TeamModel } from '../../models';
import PlayerInput, { PlayerInputOptional } from '../inputs/PlayerInput';
import Player from '../../models/definitions/Player';
import { InstanceType } from 'typegoose';
import TeamType from '../types/TeamType';

@Resolver(PlayerType)
class PlayerResolver {
  @Query(returns => PlayerType)
  async player(@Arg('id') id: string) {
    try {
      return await PlayerModel.findById(id);
    } catch (e) {
      throw e;
    }
  }

  @Query(returns => [PlayerType])
  async players() {
    try {
      return await PlayerModel.find({});
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => PlayerType)
  async addPlayer(@Arg('player') player: PlayerInput) {
    try {
      const newPlayer = new PlayerModel(player);
      return await newPlayer.save();
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => PlayerType)
  async updatePlayer(@Arg('id') id: string, @Arg('player') player: PlayerInputOptional) {
    try {
      return await PlayerModel.findAndUpdate(id, { $set: player });
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => PlayerType)
  async deletePlayer(@Arg('id') id: string) {
    try {
      const player = (await PlayerModel.findById(id)) as InstanceType<Player>;
      if (player.team && player.team !== '') {
        await TeamModel.findAndUpdate(player.team, { $pull: { players: id } });
      }
      return await PlayerModel.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  }

  @FieldResolver()
  async team(@Root() player: InstanceType<Player>): Promise<TeamType> {
    try {
      return ((await TeamModel.findOne({ _id: player.team })) as unknown) as TeamType;
    } catch (e) {
      throw e;
    }
  }
}

export default PlayerResolver;
