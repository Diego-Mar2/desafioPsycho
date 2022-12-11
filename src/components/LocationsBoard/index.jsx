import PropTypes from 'prop-types';

import { Container } from './styles';

import { CardsBoard } from '../CardsBoard';
import { useState } from 'react';
import { fetchLocations } from '../../services/fetchLocations';
import { useEffect } from 'react';

export function LocationsBoard({ pokemonList }) {

  const [locations, setLocations] = useState([]);
  const [eachLocation, setEachLocation] = useState([]);
  const [pokeData, setPokeData] = useState([]);
  const [pokeNotEncounter, setPokeNotEncounter] = useState([]);

  async function getLocationsByPokemons() {

    const getLocation = pokemonList.map(async (pokemon) => {
      const pokeLocations = await fetchLocations(pokemon.location_area_encounters);

      return { pokeLocations, name: pokemon.name };
    });

    const locationResolved = await Promise.all(getLocation);

    setLocations(locationResolved);
  }

  function addLocationsIntoPokemons() {

    const location = [];

    const pokemon = pokemonList.map((pokemon) => {
      const getPokeLocations = locations.map((pokeLocal) => pokeLocal);

      for (let i = 0; i < getPokeLocations.length; i++) {
        if (pokemon.name === getPokeLocations[i].name) {
          const local = getPokeLocations[i].pokeLocations;

          location.push(local);
          return { pokemon, location: local };
        }
      }

    });

    const noRepeatLocations = [...new Set(location.flat())];

    setEachLocation(noRepeatLocations);
    setPokeData(pokemon);

  }

  const isPokeLocationNotFound = pokeData.filter(({ location }) => location.length === 0);

  useEffect(() => {
    getLocationsByPokemons();
  }, [pokemonList]);

  useEffect(() => {
    addLocationsIntoPokemons();
  }, [locations]);

  useEffect(() => {
    setPokeNotEncounter(isPokeLocationNotFound);
  }, [pokeData]);

  return (
    <Container>
      <h1>Locations</h1>

      {locations && (
        eachLocation.map((local) => (
          <CardsBoard
            key={local}
            pokeData={pokeData}
            local={local}
          />
        ))
      )}

      {pokeNotEncounter.length > 0 && (
        <CardsBoard
          key='unknown location'
          pokeData={pokeNotEncounter}
          local='unknown location'
        />
      )}
    </Container>
  );
}

LocationsBoard.propTypes = {
  pokemonList: PropTypes.array,
};
