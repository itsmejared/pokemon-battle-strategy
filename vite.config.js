import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        pokemon: resolve(__dirname, "src/pokemon/index.html"),
        pokemonDetail: resolve(__dirname, "src/pokemon/detail.html"),
        team: resolve(__dirname, "src/team/index.html"),
        comparison: resolve(__dirname, "src/comparison/index.html"),
      },
    },
  },
});
