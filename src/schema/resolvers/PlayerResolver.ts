import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import Player from '../types/Player';

import { PlayerModel } from '../../models';
import PlayerInput, { PlayerInputOptional } from '../inputs/PlayerInput';

@Resolver(Player)
class PlayerResolver {
  @Query(returns => Player)
  async player(@Arg('id') id: string) {
    try {
      return await PlayerModel.findById(id);
    } catch (e) {
      throw e;
    }
  }

  @Query(returns => [Player])
  async players() {
    try {
      return await PlayerModel.find({});
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => Player)
  async addPlayer(@Arg('player') player: PlayerInput) {
    try {
      const newPlayer = new PlayerModel(player);
      return await newPlayer.save();
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => Player)
  async updatePlayer(@Arg('id') id: string, @Arg('player') player: PlayerInputOptional) {
    try {
      return await PlayerModel.findOneAndUpdate({ _id: id }, { $set: player });
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => Player)
  async deletePlayer(@Arg('id') id: string) {
    try {
      return await PlayerModel.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  }
}

export default PlayerResolver;
