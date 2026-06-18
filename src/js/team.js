import {
  getParam,
  loadHeaderFooter,
  refreshMainTeamHeader,
  updateUrlParam,
} from "./modules/utils.mjs";
import {
  renderPokemonEditorTemplate,
  renderPokemonSearchResultsTemplate,
  renderTeamRoster,
  renderTeamSelector,
  showToast,
} from "./modules/templates.mjs";

import TeamManager from "./modules/TeamManager.mjs";
import PokemonData from "./modules/PokemonData.mjs";

await loadHeaderFooter();
refreshMainTeamHeader();

const teamManager = new TeamManager();

renderPage(getParam("team"));

const pokemonData = new PokemonData();

let pokemonList = [];
let selectedSlot;

pokemonList = await pokemonData.getPokemonList();

function renderPage(teamId) {
  const teams = teamManager.getTeams();
  const team = teamManager.getTeam(teamId) || teamManager.getMainTeam();

  if (!teamId) {
    updateUrlParam("team", team.id);
  }
  renderTeamSelector("#teamSelector", teams, team.id, handleTeamChange, handleSetMainTeam);
  renderTeamRoster("#teamDetails", team, handleRemovePokemon, handleSlotClick);
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

function handleSlotClick(slotIndex) {
  const team = teamManager.getTeam(getParam("team"));
  const pokemon = team.pokemon[slotIndex];
  renderPokemonEditorTemplate("#pokemonEditor", slotIndex, pokemon);
  document
    .querySelectorAll(".pokemon-roster-slot")
    .forEach((slot) => slot.classList.remove("selected"));

  document.querySelector(`[data-slot-index="${slotIndex}"]`).classList.add("selected");
  selectedSlot = slotIndex;
  initializePokemonEditor();
}

function initializePokemonEditor() {
  const searchInput = document.querySelector("#pokemonSearchInput");

  const resultsContainer = document.querySelector("#pokemonSearchResults");

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.trim().toLowerCase();

    if (term.length < 3) {
      resultsContainer.innerHTML = "";
      return;
    }

    const matches = pokemonList.filter((pokemon) => pokemon.name.includes(term)).slice(0, 10);
    renderPokemonSearchResultsTemplate("#pokemonSearchResults", matches, handlePokemonSelection);
  });
}

async function handlePokemonSelection(pokemonName) {
  const selectedPokemon = await pokemonData.getPokemon(pokemonName);

  document.querySelector("#pokemonSearchResults").innerHTML = "";

  renderPokemonPreview(selectedPokemon);
}

function renderPokemonPreview(selectedPokemon) {
  const resultsContainer = document.querySelector("#pokemonSearchResults");

  resultsContainer.innerHTML = `
    <div class="pokemon-preview">
      <img
        src="${selectedPokemon.sprites.front_default}"
        alt="${selectedPokemon.name}"
      >

      <h4>${selectedPokemon.name}</h4>

      <button id="savePokemonToTeam" class="dashboard-button">
        Save To Team
      </button>
    </div>
  `;
  document.querySelector("#savePokemonToTeam").addEventListener("click", () => {
    handleSavePokemonToTeam(selectedPokemon);
  });
}

function handleSavePokemonToTeam(selectedPokemon) {
  const teamId = getParam("team");
  teamManager.replacePokemonInTeam(teamId, selectedSlot, selectedPokemon);

  refreshMainTeamHeader();
  renderPage(teamId);
  showToast("Pokémon updated from team", "success");

  document.querySelector("#pokemonEditor").innerHTML = `
    <div class="editor-placeholder">
      <h3>Pokémon Editor</h3>
      <p>Select a slot to begin editing.</p>
    </div>
  `;
}
