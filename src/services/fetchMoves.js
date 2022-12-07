export async function fetchMoves(typeURL) {

  try {
    const response = await fetch(typeURL);
    const data = await response.json();

    return data.moves;
  } catch (error) {
    console.log('fetchMoves', error);
  }
}
