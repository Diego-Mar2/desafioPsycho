export async function fetchPokemon(pokemon) {
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    return { data };

  } catch (error) {
    console.log(error);
  }
}
