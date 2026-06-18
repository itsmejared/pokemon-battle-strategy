import { loadHeaderFooter } from "./modules/utils.mjs";
import { renderTeams, showToast } from "./modules/templates.mjs";

import TeamManager from "./modules/TeamManager.mjs";

loadHeaderFooter();

const teamManager = new TeamManager();
teamManager.initializeDefaultTeam();

renderDashboard();

const createTeamButton = document.querySelector("#createTeamButton");
createTeamButton.addEventListener("click", () => {
  const teamName = prompt("Enter a team name:");
  if (!teamName?.trim()) {
    showToast("Team name is required", "warning");
    return;
  }

  const team = teamManager.addTeam(teamName.trim());
  if (!team) {
    showToast(`Team "${teamName}" already exists`, "error");
    return;
  }

  showToast(`Team "${teamName}" created successfully`, "success");
  renderDashboard();
});

function handleMainTeamSelection(teamId) {
  const team = teamManager.setMainTeam(teamId);
  if (!team) return;
  renderDashboard();
  showToast(`"${team.name}" is now your Main Team`, "success");
}

function handleDeleteTeam(teamId) {
  const team = teamManager.getTeam(teamId);
  if (team.isMain) {
    showToast("Main Team cannot be deleted", "warning");
    return;
  }
  teamManager.deleteTeam(teamId);
  renderDashboard();
  showToast(`Team "${team.name}" deleted`, "success");
}

function renderDashboard() {
  renderTeams("#teamsCarousel", teamManager.getTeams(), handleMainTeamSelection, handleDeleteTeam);
}
