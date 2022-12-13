import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

import { fetchFilters } from '../../services/fetchFilters';
import { fetchMoves } from '../../services/fetchMoves';

import { Container, SelectContainer, CustomSelect } from './styles';

export function Header({ onSubmit }) {

  const [generation, setGeneration] = useState('');
  const [types, setTypes] = useState([]);
  const [move, setMove] = useState('');
  const [generationsList, setGenerationsList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [movesList, setMovesList] = useState([]);

  const isTypesExist = types.length < 1;

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

  //função que manda os estados abaixo para o componente app
  function handleSubmit() {

    onSubmit({
      generation,
      types,
      move,
    });

  }

  //setar os tipos escolhidos, também envia como parametro ao getMovesByType
  function handleChangeTypes(value) {
    setTypes(value);
    getMovesByType(value);
  }

  //buscar os movimentos pelos tipos
  async function getMovesByType(valueTypes) {

    const moves = [];

    //adiciona no array todos os movimentos obtidos de resposta
    for await (const type of valueTypes) {
      const response = await fetchMoves(type.value);
      moves.push(response);
    }

    //flat() para unificar todos os arrays obtidos em um só
    setMovesList(moves.flat());
  }


  useEffect(() => {
    fetchFilters(setGenerationsList, setTypesList);
  }, []);

  return (
    <Container>
      <h1>Pokedex</h1>

      <SelectContainer >
        <CustomSelect
          isRequired
          classNamePrefix='Select'
          placeholder='Generation'
          options={generationsOptions}
          onChange={({ value }) => setGeneration(value)}
        />

        <CustomSelect
          isRequired
          classNamePrefix='Select'
          placeholder='Types'
          options={typesOptions}
          isMulti
          onChange={handleChangeTypes}
        />

        <CustomSelect
          classNamePrefix='Select'
          placeholder='Moves'
          options={movesOptions}
          onChange={({ value }) => setMove(value)}
          isDisabled={isTypesExist}
        />

      </SelectContainer>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={!generation || isTypesExist}
      >
        Search
      </button>

    </Container>
  );
}

Header.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
