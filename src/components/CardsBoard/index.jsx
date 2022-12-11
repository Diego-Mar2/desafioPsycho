import PropTypes from 'prop-types';

import { Container } from './styles';

import { Card } from '../Card';

export function CardsBoard({ pokeData, local }) {

  const isPokeEncounters = pokeData.filter(({ location }) => location.includes(local) );

  console.log('ultraviolence', isPokeEncounters);

  // console.log(pokeData);

  return (
    <Container>
      <h2>{local}</h2>
      {pokeData.map((data) => (
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
  pokeData: PropTypes.object,
  local: PropTypes.string,
};
