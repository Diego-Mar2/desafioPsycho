import { fetchPokemon } from './fetchPokemon';

export async function fetchPokemonList(genURL, allPokemon) {

  try {
    const response = await fetch(genURL);
    const data = await response.json();

    //map para listar os pokemons usando a propriedade pokemon_species dentro de geração
    const promises = data.pokemon_species.map(async (pokemon) => {

      //pegando o nome por espécies, temos uma inconsistência, pois alguns pokemons tem nomes compostos, e suas espécies não
      const pokemonData = (await fetchPokemon(pokemon.name));

      //quando temos um 404 de retorno pelas espécies, conferimos se o nome existe dentro da lista de pokemons
      const isFailed = pokemonData.response.status === 404;

      if (isFailed) {
        for (let i = 0; i < allPokemon.length; i++) {

          const isNameEqual = allPokemon[i].name.includes(pokemon.name);

          if (isNameEqual) {

            //será procurado na lista o nome da especie do pokemon, e se for existente, será realizado um novo fetch.
            const pokemonData = await fetchPokemon(allPokemon[i].name);
            console.log(allPokemon[i].name);
            console.log('entrou no for');
            return pokemonData.data;
          }
        }
      }

      return pokemonData.data;
    });

    const pokemonList = await Promise.all(promises);

    return pokemonList.filter((pokemon) => pokemon);
  } catch (error) {
    console.log(error);
  }
}


// (await fetchPokemon(pokemon.name)).data,
