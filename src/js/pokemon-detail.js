import { loadHeaderFooter, getParam, capitalize } from "./modules/utils.mjs";
import { renderPokemonDetail, showToast } from "./modules/templates.mjs";

import PokemonData from "./modules/PokemonData.mjs";
import TeamManager from "./modules/TeamManager.mjs";

loadHeaderFooter();

const pokemonName = getParam("pokemon");
const pokemonData = new PokemonData();
const pokemon = await pokemonData.getPokemon(pokemonName);

const teamManager = new TeamManager();
const teams = teamManager.getTeams();

renderPokemonDetail("#pokemonDetail", pokemon, teams, handleAddPokemon);

function handleAddPokemon() {
  const teamId = document.querySelector("#teamSelect").value;
  const team = teamManager.getTeams().find((team) => team.id === teamId);
  const added = teamManager.addPokemonToTeam(teamId, pokemon);

  if (added) {
    showToast(`${capitalize(pokemon.name)} was added to ${team.name}`, "success");
  } else {
    showToast(
      `${capitalize(pokemon.name)} already exists in ${team.name} or the team is full`,
      "error"
    );
  }
}
