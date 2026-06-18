import { convertToJson } from "./utils.mjs";

export default class PokemonData {
  constructor() {
    this.baseURL = import.meta.env.VITE_POKEAPI_URL;
  }

  async getPokemon(nameOrId) {
    const response = await fetch(`${this.baseURL}/pokemon/${nameOrId.toString().toLowerCase()}`);
    return await convertToJson(response);
  }

  async getPokemonList(limit = 151, offset = 0) {
    const response = await fetch(`${this.baseURL}/pokemon?limit=${limit}&offset=${offset}`);
    return await convertToJson(response);
  }

  async getPokemonSpecies(nameOrId) {
    const response = await fetch(`${this.baseURL}/pokemon-species/${nameOrId}`);
    return await convertToJson(response);
  }

  async getEvolutionChain(chainUrl) {
    const response = await fetch(chainUrl);
    return await convertToJson(response);
  }

  async searchPokemon(name) {
    try {
      return await this.getPokemon(name);
    } catch {
      return null;
    }
  }
}
