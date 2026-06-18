import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class TeamManager {
  constructor() {
    this.storageKey = "pokemon-teams";
  }

  getTeams() {
    return getLocalStorage(this.storageKey) || [];
  }

  saveTeams(teams) {
    setLocalStorage(this.storageKey, teams);
  }

  createTeam(name, isMain = false) {
    return {
      id: crypto.randomUUID(),
      name,
      pokemon: [],
      isMain,
    };
  }

  createPokemonSnapshot(pokemon) {
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      types: pokemon.types.map((type) => type.type.name),
    };
  }

  addTeam(name) {
    const teams = this.getTeams();
    const exists = teams.some((team) => team.name.toLowerCase() === name.toLowerCase());
    if (exists) return null;
    const team = this.createTeam(name, teams.length === 0);
    teams.push(team);
    this.saveTeams(teams);
    return team;
  }

  deleteTeam(teamId) {
    const teams = this.getTeams();
    const filteredTeams = teams.filter((team) => team.id !== teamId);
    this.saveTeams(filteredTeams);
  }

  getTeam(teamId) {
    return this.getTeams().find((team) => team.id === teamId);
  }

  getMainTeam() {
    return this.getTeams().find((team) => team.isMain);
  }

  setMainTeam(teamId) {
    const teams = this.getTeams();
    const currentMainTeam = teams.find((team) => team.isMain);
    if (currentMainTeam?.id === teamId) {
      return false;
    }
    teams.forEach((team) => {
      team.isMain = team.id === teamId;
    });
    this.saveTeams(teams);
    return teams.find((team) => team.id === teamId);
  }

  addPokemonToTeam(teamId, pokemon) {
    const teams = this.getTeams();
    const team = teams.find((team) => team.id === teamId);
    if (!team) return false;
    if (team.pokemon.length >= 6) return false;
    const exists = team.pokemon.some((member) => member.id === pokemon.id);
    if (exists) return false;
    team.pokemon.push(this.createPokemonSnapshot(pokemon));
    this.saveTeams(teams);
    return true;
  }

  replacePokemonInTeam(teamId, slotIndex, pokemon) {
    const teams = this.getTeams();
    const team = teams.find((team) => team.id === teamId);
    if (!team) return false;

    if (slotIndex < 0 || slotIndex >= 6) return false;
    const exists = team.pokemon.some(
      (member, index) => member.id === pokemon.id && index !== slotIndex
    );

    if (exists) return false;
    team.pokemon[slotIndex] = this.createPokemonSnapshot(pokemon);
    this.saveTeams(teams);
    return true;
  }

  removePokemonFromTeam(teamId, pokemonId) {
    const teams = this.getTeams();
    const team = teams.find((team) => team.id === teamId);
    if (!team) return false;
    team.pokemon = team.pokemon.filter((pokemon) => pokemon.id !== pokemonId);
    this.saveTeams(teams);
    return true;
  }

  initializeDefaultTeam() {
    const teams = this.getTeams();
    if (teams.length === 0) {
      const mainTeam = this.createTeam("Main Team", true);
      this.saveTeams([mainTeam]);
      return [mainTeam];
    }
    return teams;
  }
}
