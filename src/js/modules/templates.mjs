import {
  renderListWithTemplate,
  qs,
  qsAll,
  renderWithTemplate,
  formatPokemonName,
  capitalize,
} from "./utils.mjs";

export function teamCardTemplate(team) {
  const slots = [...team.pokemon];

  while (slots.length < 6) {
    slots.push(null);
  }

  return `
    <article class="team-card" data-id="${team.id}">
      <div class="team-card-header">
        <button class="team-star ${team.isMain ? "active" : ""}" data-team-id="${team.id}" title="Set as Main Team">★</button>
        <h3>${team.name}</h3>
        <button class="team-delete" data-team-id="${team.id}" title="Delete Team">🗑️</button>
      </div>

      <div class="team-pokemon-grid">
        ${slots
          .map(
            (pokemon) => `
              <div class="pokemon-slot">
                ${pokemon ? `<img src="${pokemon.sprite}" alt="${pokemon.name}">` : "+"}
              </div>
            `
          )
          .join("")}
      </div>
    </article>
  `;
}

export function renderTeams(parentElement, teams, onMainTeamClick, onDeleteTeamClick) {
  renderListWithTemplate(teamCardTemplate, qs(parentElement), teams, "beforeend", true);
  qsAll(".team-star").forEach((button) => {
    button.addEventListener("click", () => {
      onMainTeamClick(button.dataset.teamId);
    });
  });

  qsAll(".team-delete").forEach((button) => {
    button.addEventListener("click", () => {
      onDeleteTeamClick(button.dataset.teamId);
    });
  });
}

export function teamSelectorTemplate(teams, selectedTeamId) {
  const selectedTeam = teams.find((team) => team.id === selectedTeamId);

  return `
    <div class="team-selector-card">
      <div class="team-selector-grid">
        <div class="team-selector-control">
          <div class="team-selector-header">
            <span class="team-selector-label">
                Current Team
            </span>
            ${
              selectedTeam.isMain
                ? `<button class="team-badge team-badge-main" disabled>★ Main Team</button>`
                : `<button class="team-badge team-badge-action" id="setMainTeamButton">
                ☆ Set as Main Team
              </button>`
            }
          </div>
          <select id="teamSelect">
            ${teams
              .map(
                (team) => `
                  <option
                    value="${team.id}"
                    ${team.id === selectedTeamId ? "selected" : ""}
                  >
                    ${team.name}
                  </option>
                `
              )
              .join("")}
          </select>
        </div>

        <div class="team-summary">
          <span class="team-summary-label">
            Team Size
          </span>
          <span class="team-summary-value">
            ${selectedTeam.pokemon.length} / 6 Pokémon
          </span>
        </div>
      </div>
    </div>
  `;
}

export function renderTeamSelector(
  parentElement,
  teams,
  selectedTeamId,
  onTeamChange,
  onSetMainTeam
) {
  renderWithTemplate(teamSelectorTemplate(teams, selectedTeamId), qs(parentElement), null, () => {
    qs("#teamSelect").addEventListener("change", (event) => {
      onTeamChange(event.target.value);
    });

    const mainButton = qs("#setMainTeamButton");

    if (mainButton) {
      mainButton.addEventListener("click", () => {
        onSetMainTeam();
      });
    }
  });
}

export function teamRosterTemplate(team) {
  const slots = [...team.pokemon];

  while (slots.length < 6) {
    slots.push(null);
  }

  return `
    <section class="team-roster">
      <div class="team-pokemon-grid">
        ${slots
          .map(
            (pokemon) => `
              <div class="pokemon-slot">
                ${
                  pokemon
                    ? `
                      <div class="pokemon-roster-card">
                        <img class="pokemon-roster-sprite" src="${pokemon.sprite}" alt="${pokemon.name}">
                        <p class="pokemon-roster-name">
                            ${pokemon.name}
                        </p>
                      </div>
                    `
                    : "+"
                }
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

export function renderTeamRoster(parentElement, team) {
  renderWithTemplate(teamRosterTemplate(team), qs(parentElement));
}

export function pokemonSearchTemplate() {
  return `
    <div class="pokemon-search">
      <input
        id="pokemonSearchInput"
        class="pokemon-search-input"
        type="search"
        placeholder="Search Pokémon..."
        autocomplete="off"
      >
    </div>
  `;
}

export function renderPokemonSearch(parentElement, onSearch) {
  renderWithTemplate(pokemonSearchTemplate(), qs(parentElement));

  qs("#pokemonSearchInput").addEventListener("input", onSearch);
}

export function pokemonResultTemplate(pokemon) {
  return `
    <button
      class="pokemon-result"
      data-name="${pokemon.name}"
    >
      ${formatPokemonName(pokemon.name)}
    </button>
  `;
}

export function renderPokemonResults(parentElement, pokemon, onPokemonClick) {
  renderListWithTemplate(pokemonResultTemplate, qs(parentElement), pokemon, "beforeend", true);

  qsAll(".pokemon-result").forEach((button) => {
    button.addEventListener("click", () => {
      onPokemonClick(button.dataset.name);
    });
  });
}

export function popularPokemonTemplate(name) {
  return `
    <button
      class="popular-pokemon"
      data-name="${name}"
    >
      ${formatPokemonName(name)}
    </button>
  `;
}

export function renderPopularPokemon(parentElement, pokemon, onPokemonClick) {
  renderListWithTemplate(popularPokemonTemplate, qs(parentElement), pokemon, "beforeend", true);

  qsAll(".popular-pokemon").forEach((button) => {
    button.addEventListener("click", () => {
      onPokemonClick(button.dataset.name);
    });
  });
}

export function pokemonDetailTemplate(pokemon, teams) {
  return `
    <section class="pokemon-detail">
      <div class="pokemon-detail-header">
        <h1>
          ${capitalize(pokemon.name)}
          #${pokemon.id}
        </h1>

        <img
          class="pokemon-detail-sprite"
          src="${pokemon.sprites.front_default}"
          alt="${pokemon.name}"
        >
      </div>

      <div class="pokemon-detail-info">
        <p>
          <strong>Type:</strong>
          ${pokemon.types.map((type) => capitalize(type.type.name)).join(", ")}
        </p>

        <p>
          <strong>Height:</strong>
          ${pokemon.height}
        </p>

        <p>
          <strong>Weight:</strong>
          ${pokemon.weight}
        </p>

        <div class="pokemon-team-actions">
            <label for="teamSelect">
                Team
            </label>

            <select id="teamSelect">
                ${teams
                  .map(
                    (team) => `
                    <option value="${team.id}" ${team.isMain ? "selected" : ""}>
                        ${team.name}
                    </option>
                    `
                  )
                  .join("")}
            </select>

            <button id="addPokemonButton" class="btn btn-primary">
                Add To Team
            </button>
        </div>
      </div>
    </section>
  `;
}

export function renderPokemonDetail(parentElement, pokemon, teams, onAddPokemon) {
  renderWithTemplate(pokemonDetailTemplate(pokemon, teams), qs(parentElement));

  qs("#addPokemonButton").addEventListener("click", onAddPokemon);
}

export function showToast(message, type = "success") {
  const toast = document.createElement("div");

  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}
