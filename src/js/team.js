import { getParam, loadHeaderFooter, updateUrlParam } from "./modules/utils.mjs";
import { renderTeamRoster, renderTeamSelector } from "./modules/templates.mjs";

import TeamManager from "./modules/TeamManager.mjs";

loadHeaderFooter();

const teamManager = new TeamManager();

renderPage(getParam("team"));

function renderPage(teamId) {
  const teams = teamManager.getTeams();
  const team = teamManager.getTeam(teamId) || teamManager.getMainTeam();

  if (!teamId) {
    updateUrlParam("team", team.id);
  }
  renderTeamSelector("#teamSelector", teams, team.id, handleTeamChange, handleSetMainTeam);
  renderTeamRoster("#teamDetails", team);
}

function handleTeamChange(teamId) {
  updateUrlParam("team", teamId);
  renderPage(teamId);
}

function handleSetMainTeam() {
  const teamId = getParam("team");
  teamManager.setMainTeam(teamId);
  renderPage(teamId);
}
