import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import Select from 'react-select';

import { fetchFilters } from '../../services/fetchFilters';
import { fetchMoves } from '../../services/fetchMoves';

import { Container, SelectContainer } from './styles';

export function Header({ onSubmit }) {

  const [generation, setGeneration] = useState('');
  const [types, setTypes] = useState([]);
  const [move, setMove] = useState('');
  const [generationsList, setGenerationsList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [movesList, setMovesList] = useState([]);

  function handleSubmit() {

    onSubmit({
      generation,
      types,
      move,
    });

  }

  async function getMovesByType(valueTypes) {

    const moves = [];

    for await (const type of valueTypes) {
      const response = await fetchMoves(type.value);
      moves.push(response);
    }

    setMovesList(moves.flat());
  }

  function handleChangeTypes(value) {
    setTypes(value);
    getMovesByType(value);
  }

  useEffect(() => {
    fetchFilters(setGenerationsList, setTypesList);
  }, []);

  const generationsOptions = generationsList.map((gen) => {
    return {
      value: gen.url,
      label: gen.name
    };
  });

  const typesOptions = typesList.map((type) => {
    return {
      value: type.url,
      label: type.name
    };
  });

  const movesOptions = movesList.map((move) => {
    return {
      value: move.name,
      label: move.name
    };
  });

  return (
    <Container>
      <h1>Pokedex</h1>

      <SelectContainer >
        <Select
          options={generationsOptions}
          onChange={({ value }) => setGeneration(value)}
        />

        <Select
          options={typesOptions}
          isMulti
          onChange={handleChangeTypes}
        />

        <Select
          options={movesOptions}
          onChange={({ value }) => setMove(value)}
        />

      </SelectContainer>

      <button type="submit" onClick={handleSubmit} >Search</button>

    </Container>
  );
}

Header.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
