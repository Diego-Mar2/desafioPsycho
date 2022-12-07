export async function fetchPokemon(pokemon){
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  let response;
  let data;
  let error;

  try {
    response = await fetch(URL);
    data = await response.json();
    error = false;
  } catch {
    error = true;
  }

  return { response, data, error };
}
