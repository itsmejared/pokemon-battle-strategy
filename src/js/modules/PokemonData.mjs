import { convertToJson } from "./utils.mjs";

export default class PokemonData {
  constructor() {
    this.baseURL = import.meta.env.VITE_POKEAPI_URL;
    this.popularPokemon = import.meta.env.VITE_POPULAR_POKEMON;
  }

  async getPokemon(nameOrId) {
    const response = await fetch(`${this.baseURL}/pokemon/${nameOrId.toString().toLowerCase()}`);
    return await convertToJson(response);
  }

  async getPokemonList(limit = 2000, offset = 0) {
    const response = await fetch(`${this.baseURL}/pokemon?limit=${limit}&offset=${offset}`);
    const data = await convertToJson(response);
    return data.results;
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

  async getPopularPokemon() {
    const response = await fetch(this.popularPokemon);
    return await convertToJson(response);
  }
}
