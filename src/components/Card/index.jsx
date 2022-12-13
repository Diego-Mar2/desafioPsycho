import PropTypes from 'prop-types';

import { Container, Information } from './styles';

import { pokemonTypes } from '../../assets/styles/pokemonTypes';

import pokeball from '../../assets/images/pokeball.svg';
import pokeImageNotFound from '../../assets/images/img-not-found.png';

export function Card({ pokemon }) {

  const [{ color }] = pokemonTypes.filter(
    (type) => pokemon.types[0].type.name.indexOf(type.name) !== -1
  );

  const pokeImage = pokemon.sprites.front_default;

  return (
    <Container
      color={color}
    >
      <img src={pokeImage ? pokeImage : pokeImageNotFound} alt="" />
      <Information>
        <img src={pokeball} alt="pokeball" />
        <div className="pokemonData">
          <h3>{pokemon.name}</h3>
        </div>
      </Information>
    </Container>
  );
}

Card.propTypes = {
  pokemon: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  sprites: PropTypes.string,
  types: PropTypes.array,
};
