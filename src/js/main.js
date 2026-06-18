import { loadHeaderFooter } from "./modules/utils.mjs";
import { renderTeams } from "./modules/templates.mjs";

import TeamManager from "./modules/TeamManager.mjs";

loadHeaderFooter();

const teamManager = new TeamManager();
teamManager.initializeDefaultTeam();

renderTeams("#teamsCarousel", teamManager.getTeams());
