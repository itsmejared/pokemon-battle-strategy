import { loadHeaderFooter, getParam, capitalize } from "./modules/utils.mjs";
import { renderPokemonDetail, showToast } from "./modules/templates.mjs";

import PokemonData from "./modules/PokemonData.mjs";
import TeamManager from "./modules/TeamManager.mjs";

loadHeaderFooter();

const pokemonData = new PokemonData();
const teamManager = new TeamManager();

const pokemonName = getParam("pokemon");

const pokemon = await pokemonData.getPokemon(pokemonName);
const species = await pokemonData.getPokemonSpecies(pokemon.name);
const evolutionChain = await pokemonData.getEvolutionChain(species.evolution_chain.url);

const evolutionNames = getEvolutionNames(evolutionChain.chain);
const teams = teamManager.getTeams();

renderPokemonDetail("#pokemonDetail", pokemon, species, evolutionNames, teams, handleAddPokemon);

function getEvolutionNames(chain) {
  const evolutions = [];
  let current = chain;
  while (current) {
    evolutions.push(current.species.name);
    current = current.evolves_to[0];
  }
  return evolutions;
}

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
