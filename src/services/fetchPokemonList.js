import { fetchPokemon } from './fetchPokemon';

export async function fetchPokemonList(genURL, allPokemon) {

  try {
    const response = await fetch(genURL);
    const data = await response.json();
    const dataPokemon = data.pokemon_species.map(({ name }) => name);
    const pokemonNames = allPokemon.filter(({ name }) => dataPokemon.some((n) => name.includes(n)));

    //map para listar os pokemons usando a propriedade pokemon_species dentro de geração
    const promises = pokemonNames.map(async (pokemon) => {

      for (let i = 0; i < allPokemon.length; i++) {

        const isNameEqual = allPokemon[i].name.endsWith(pokemon.name);

        if (isNameEqual) {
          const pokemonData = await fetchPokemon(allPokemon[i].name);

          return pokemonData.data;
        }
      }
    });

    const pokemonList = await Promise.all(promises);

    return pokemonList.filter((pokemon) => pokemon);
  } catch (error) {
    console.log(error);
  }
}
