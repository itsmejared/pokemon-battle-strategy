import {
  getParam,
  loadHeaderFooter,
  refreshMainTeamHeader,
  updateUrlParam,
} from "./modules/utils.mjs";
import { renderTeamRoster, renderTeamSelector } from "./modules/templates.mjs";

import TeamManager from "./modules/TeamManager.mjs";

await loadHeaderFooter();
refreshMainTeamHeader();

const teamManager = new TeamManager();

renderPage(getParam("team"));

function renderPage(teamId) {
  const teams = teamManager.getTeams();
  const team = teamManager.getTeam(teamId) || teamManager.getMainTeam();

  if (!teamId) {
    updateUrlParam("team", team.id);
  }
  renderTeamSelector("#teamSelector", teams, team.id, handleTeamChange, handleSetMainTeam);
  renderTeamRoster("#teamDetails", team, handleRemovePokemon);
}

function handleTeamChange(teamId) {
  updateUrlParam("team", teamId);
  renderPage(teamId);
}

function handleSetMainTeam() {
  const teamId = getParam("team");
  teamManager.setMainTeam(teamId);
  refreshMainTeamHeader();
  renderPage(teamId);
}

function handleRemovePokemon(teamId, pokemonId) {
  teamManager.removePokemonFromTeam(teamId, pokemonId);
  refreshMainTeamHeader();
  renderPage(teamId);
  showToast("Pokémon removed from team", "success");
}
