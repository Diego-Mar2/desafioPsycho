export async function fetchLocations(pokemon){
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}/encounters`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    const locations = data.map(
      async (location) => location.location_area.name
    );

    return locations;

  } catch (error) {
    console.log(error);
  }
}
