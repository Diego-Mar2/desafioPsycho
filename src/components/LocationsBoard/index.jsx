import PropTypes from 'prop-types';

import { Container } from './styles';

import { CardsBoard } from '../CardsBoard';

export function LocationsBoard({ pokemonList, setPokemonList }){

  return (
    <Container>
      <h1>Locations</h1>

      {pokemonList && (
        <CardsBoard
          pokemonList={pokemonList}
          setPokemonList={setPokemonList}
        />
      )}
    </Container>
  );
}

LocationsBoard.propTypes = {
  pokemonList: PropTypes.array,
  setPokemonList: PropTypes.func,
};
