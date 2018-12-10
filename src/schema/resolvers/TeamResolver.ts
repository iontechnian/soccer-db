import {
  Resolver,
  Query,
  Arg,
  Mutation,
  ResolverInterface,
  FieldResolver,
  Root,
} from 'type-graphql';
import TeamType from '../types/TeamType';
import Team from '../../models/definitions/Team';
import { TeamModel, PlayerModel } from '../../models';
import TeamInput, { TeamInputOptional } from '../inputs/TeamInput';
import PlayerType from '../types/PlayerType';
import { InstanceType } from 'typegoose';
import Player from '../../models/definitions/Player';

@Resolver(TeamType)
class TeamResolver {
  @Query(returns => TeamType)
  async team(@Arg('id') id: string) {
    try {
      return await TeamModel.findById(id);
    } catch (e) {
      throw e;
    }
  }

  @Query(returns => [TeamType])
  async teams() {
    try {
      return await TeamModel.find({});
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => TeamType)
  async addTeam(@Arg('team') team: TeamInput) {
    try {
      const newTeam = new TeamModel(team);
      await PlayerModel.findAndUpdate(team.captain, { $set: { team: newTeam.id } });
      return await newTeam.save();
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => TeamType)
  async updateTeam(@Arg('id') id: string, @Arg('team') team: TeamInputOptional) {
    try {
      const teamInstance = (await TeamModel.findById(id)) as InstanceType<Team>;
      if (team.captain) {
        await PlayerModel.findOneAndUpdate({ _id: team.captain }, { $set: { team: '' } });
        await PlayerModel.findAndUpdate(team.captain, { $set: { team: id } });
      }
      return await TeamModel.findAndUpdate(id, { $set: team });
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => TeamType)
  async deleteTeam(@Arg('id') id: string) {
    try {
      const team = (await TeamModel.findById(id)) as InstanceType<Team>;
      await PlayerModel.update({ _id: { $in: team.players } }, { $set: { team: '' } });
      await PlayerModel.findOneAndUpdate({ _id: team.captain }, { $set: { team: '' } });
      return await TeamModel.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => TeamType)
  async addPlayerToTeam(@Arg('teamId') teamId: string, @Arg('playerId') playerId: string) {
    try {
      await PlayerModel.findAndUpdate(playerId, { $set: { team: teamId } });
      return await TeamModel.findAndUpdate(teamId, { $push: { players: playerId } });
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => TeamType)
  async removePlayerFromTeam(@Arg('teamId') teamId: string, @Arg('playerId') playerId: string) {
    try {
      await PlayerModel.findAndUpdate(playerId, { $set: { team: '' } });
      return await TeamModel.findAndUpdate(teamId, { $pull: { players: playerId } });
    } catch (e) {
      throw e;
    }
  }

  @FieldResolver()
  async captain(@Root() team: InstanceType<Team>): Promise<PlayerType> {
    try {
      return ((await PlayerModel.findById(team.captain)) as unknown) as PlayerType;
    } catch (e) {
      throw e;
    }
  }

  @FieldResolver()
  async players(@Root() team: InstanceType<Team>): Promise<PlayerType[]> {
    try {
      return ((await PlayerModel.find({ _id: { $in: team.players } })) as unknown) as PlayerType[];
    } catch (e) {
      throw e;
    }
  }
}

export default TeamResolver;
