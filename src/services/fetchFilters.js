export function fetchFilters( setGenerationsList, setTypesList ) {
  const generationsURL = 'https://pokeapi.co/api/v2/generation';
  const typesURL = 'https://pokeapi.co/api/v2/type';

  Promise.all([
    fetch(generationsURL),
    fetch(typesURL),
  ])
    .then( async ([gen, type]) => {
      const generations = await gen.json();
      const types = await type.json();

      return [generations, types];
    })
    .then((response) => {
      setGenerationsList(response[0].results);
      setTypesList(response[1].results);
    })
    .catch((error) => {
      console.log(error);
    });

}
