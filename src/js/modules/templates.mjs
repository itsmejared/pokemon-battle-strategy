import { renderListWithTemplate, qs } from "./utils.mjs";

export function teamCardTemplate(team) {
  const slots = [...team.pokemon];

  while (slots.length < 6) {
    slots.push(null);
  }

  return `
    <article class="team-card" data-id="${team.id}">
      <div class="team-card-header">
        <button class="team-star ${team.isMain ? "active" : ""}">
          ★
        </button>

        <h3>${team.name}</h3>
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

export function renderTeams(parentElement, teams) {
  renderListWithTemplate(teamCardTemplate, qs(parentElement), teams, "beforeend", true);
}
