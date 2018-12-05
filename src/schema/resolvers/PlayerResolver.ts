import { Resolver, Query, Arg } from 'type-graphql';
import Player from '../types/Player';

import { PlayerModel } from '../../models';

@Resolver(Player)
class PlayerResolver {
  @Query(returns => Player)
  async player(@Arg('id') id: string) {
    try {
      const player = await PlayerModel.findById(id);
    } catch (e) {}
  }
}

export default PlayerResolver;
