import { loadHeaderFooter } from "./modules/utils.mjs";
import TeamManager from "./modules/TeamManager.mjs";

loadHeaderFooter();

const teamManager = new TeamManager();
teamManager.initializeDefaultTeam();
