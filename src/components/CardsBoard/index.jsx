import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

import { Card } from '../Card';

export function CardsBoard({ pokeData, local }) {

  const [pokeEncounter, setPokeEncounter] = useState([]);

  function findPokemons() {
    if (local === 'unknown location') {

      const isPokeNotEncounters = pokeData.filter(({ location }) => location.length === 0);

      return setPokeEncounter(isPokeNotEncounters);
    }

    const isPokeEncounters = pokeData.filter(({ location }) => location.includes(local));

    setPokeEncounter(isPokeEncounters);
  }

  useEffect(() => {
    findPokemons();
  }, [pokeData]);

  return (
    <Container>
      <h2>{local}</h2>
      {pokeEncounter.map((data) => (
        <Card
          key={data.pokemon.name}
          pokemon={data.pokemon}
        />
      ))}
    </Container>
  );
}

CardsBoard.propTypes = {
  pokemonList: PropTypes.array,
  pokeData: PropTypes.array,
  local: PropTypes.string,
};
