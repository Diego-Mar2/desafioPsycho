import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

import { Card } from '../Card';

export function CardsBoard({ pokemonList }) {

  const [pokemonImage, setPokemonImage] = useState();

  useEffect(() => {
    function addImagetoCard(){
      setPokemonImage(pokemonList.sprites);
    }
    addImagetoCard();
  }, [pokemonImage]);

  return (
    <Container>
      <h2>City</h2>
      {pokemonList.map((pokemon) => (
        <Card
          key={pokemon.name}
          pokemon={pokemon}
        />
      ))}
    </Container>
  );
}

CardsBoard.propTypes = {
  pokemonList: PropTypes.array,
  setPokemonList: PropTypes.func,
};
