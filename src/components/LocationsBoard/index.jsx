import PropTypes from 'prop-types';

import { Container, Home } from './styles';

import { CardsBoard } from '../CardsBoard';
import { useState } from 'react';
import { fetchLocations } from '../../services/fetchLocations';
import { useEffect } from 'react';

import detective from '../../assets/images/detective_pikachu.png';

import Loader from '../Loader';

export function LocationsBoard({
  pokemonList,
  isLoading,
  setIsLoading,
  isFirstTime,

}) {

  const [eachLocation, setEachLocation] = useState([]);
  const [pokeData, setPokeData] = useState([]);
  const [pokeNotEncounter, setPokeNotEncounter] = useState([]);

  //capturar todas as localizações dos pokemons
  async function getLocationsByPokemons() {

    const getLocation = pokemonList.map(async (pokemon) => {
      const pokeLocations = await fetchLocations(pokemon.location_area_encounters);

      //relacionar as localizações obtidas com os nomes dos pokemons pertencentes
      return { pokeLocations, name: pokemon.name };
    });

    const locationResolved = await Promise.all(getLocation);

    addLocationsIntoPokemons(locationResolved);
  }

  function addLocationsIntoPokemons(locationResolved) {

    const location = [];

    const pokemon = pokemonList.map((pokemon) => {
      const getPokeLocations = locationResolved.map((pokeLocal) => pokeLocal);

      for (let i = 0; i < getPokeLocations.length; i++) {
        if (pokemon.name === getPokeLocations[i].name) {
          const local = getPokeLocations[i].pokeLocations;

          location.push(local);

          //relacionar o pokemon(objeto completo) as localizações pertencentes
          return { pokemon, location: local };
        }
      }
    });

    //salvar os nomes das localizações em um estado tirando as repetições
    const noRepeatLocations = [...new Set(location.flat())];

    setEachLocation(noRepeatLocations);
    setPokeData(pokemon);
    setPokeNotEncounter(pokemon.filter(({location}) => location.length === 0));
    setIsLoading(false);

  }

  useEffect(() => {
    getLocationsByPokemons();
  }, [pokemonList]);

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {pokeData.length < 1 && !isLoading && (
        <Home>
          <img src={detective} alt="detective" />

          {isFirstTime
            ?
            <span>Você pode procurar a localização de pokemons por
              <strong> Geração</strong>,
              <strong> Tipos</strong> e
              <strong> Ataques </strong>!!
            </span>
            :
            <span>Ops... Não consegui achar nenhum pokemon com essas características</span>
          }
        </Home>
      )}

      {pokeData.length >= 1 && (
        <>
          <h1>Locations</h1>

          {pokeData &&

          //para cada localização
            eachLocation.map((local) => (
              <CardsBoard
                key={local}
                pokeData={pokeData}
                local={local}
              />
            ))
          }

          {/* se tiverem pokemons não localizados */}
          {pokeNotEncounter.length > 0 && (
            <CardsBoard
              key='unknown location'
              pokeData={pokeNotEncounter}
              local='unknown location'
            />
          )}
        </>
      )}

    </Container>
  );
}

LocationsBoard.propTypes = {
  pokemonList: PropTypes.array,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
  isFirstTime: PropTypes.bool,
};
