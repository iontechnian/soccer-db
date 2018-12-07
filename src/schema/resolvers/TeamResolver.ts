import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import Team from '../types/Team';
import { TeamModel } from '../../models';
import TeamInput, { TeamInputOptional } from '../inputs/TeamInput';

@Resolver(Team)
class TeamResolver {
  @Query(returns => Team)
  async team(@Arg('id') id: string) {
    try {
      return await TeamModel.findById(id);
    } catch (e) {
      throw e;
    }
  }

  @Query(returns => [Team])
  async teams() {
    try {
      return await TeamModel.find({});
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => Team)
  async addTeam(@Arg('team') team: TeamInput) {
    try {
      const newTeam = new TeamModel(team);
      return await newTeam.save();
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => Team)
  async updateTeam(@Arg('id') id: string, @Arg('team') team: TeamInputOptional) {
    try {
      return await TeamModel.findOneAndUpdate({ _id: id }, { $set: team });
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => Team)
  async deleteTeam(@Arg('id') id: string) {
    try {
      return await TeamModel.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  }
}

export default TeamResolver;
