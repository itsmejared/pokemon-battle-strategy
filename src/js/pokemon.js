import { loadHeaderFooter, refreshMainTeamHeader } from "./modules/utils.mjs";
import {
  renderPokemonSearch,
  renderPokemonResults,
  renderPopularPokemon,
} from "./modules/templates.mjs";

import PokemonData from "./modules/PokemonData.mjs";

const pokemonData = new PokemonData();

let pokemonList = [];

await loadHeaderFooter();
refreshMainTeamHeader();

pokemonList = await pokemonData.getPokemonList();

renderPokemonSearch("#pokemonSearch", handleSearch);

const popularPokemon = await pokemonData.getPopularPokemon();

renderPopularPokemon("#popularPokemon", popularPokemon, handlePokemonClick);

function handleSearch(event) {
  const term = event.target.value.trim().toLowerCase();

  const popularSection = document.querySelector("#popularPokemon");

  if (term.length < 3) {
    popularSection.classList.remove("hidden");
    renderPokemonResults("#pokemonResults", []);
    return;
  }

  popularSection.classList.add("hidden");
  const matches = pokemonList.filter((pokemon) => pokemon.name.includes(term)).slice(0, 10);
  renderPokemonResults("#pokemonResults", matches, handlePokemonClick);
}

function handlePokemonClick(name) {
  window.location.href = `/pokemon/detail.html?pokemon=${name}`;
}
