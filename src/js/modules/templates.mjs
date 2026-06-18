import { renderListWithTemplate, qs, qsAll } from "./utils.mjs";

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
