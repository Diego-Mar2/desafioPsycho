import { fetchPokemon } from './fetchPokemon';

export async function fetchPokemonList(genURL) {

  try {
    const response = await fetch(genURL);
    const data = await response.json();

    const promises = data.pokemon_species.map(
      async (pokemon) => (await fetchPokemon(pokemon.name)).data
    );

    const pokemonList = await Promise.all(promises);

    return pokemonList.filter((pokemon) => pokemon);
  } catch (error) {
    console.log(error);
  }
}
