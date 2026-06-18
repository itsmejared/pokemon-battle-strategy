import { loadHeaderFooter, getParam } from "./modules/utils.mjs";

loadHeaderFooter();

const pokemonName = getParam("pokemon");

console.log("Pokemon:", pokemonName);
