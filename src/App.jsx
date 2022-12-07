import { useState } from 'react';
import { GlobalStyles } from './assets/styles/GlobalStyles';
import { Header } from './components/Header';
import { LocationsBoard } from './components/LocationsBoard';
import { fetchPokemonList } from './services/fetchPokemonList';

export default function App() {

  const [pokemonList, setPokemonList] = useState([]);
  // const [locations, setLocations] = useState([]);

  if (pokemonList) {
    console.log('app ', pokemonList);
  }

  //ok
  async function handleSubmit(filterData) {
    try {

      //recebe os parametros dos filtros do header
      const filter = {
        generation: filterData.generation,
        type: filterData.types,
        move: filterData.move,
      };

      console.log(filter.move);

      //busca pokemons pelo filtro geração (uso o link da geração)
      const pokemonListData = await fetchPokemonList(filter.generation);

      //filtro de pokemons pelos tipos selecionados
      const filterPokemonByType = pokemonListData.filter((pokemon) => {

        //verifica toda a lista pelos tipos
        const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
        const moves = pokemon.moves.map((moveInfo) => moveInfo.move.name);

        const existMoves = moves.includes(filter.move);

        //for para verificar se o pokemon em questão possui algum dos tipos selecionados.
        for (let i = 0; i < filter.type.length; i++) {

          const existTypes = types.includes(filter.type[i].label);

          if (filter.move) {
            if (existTypes && existMoves) {
              return true;
            }
          } else if (existTypes) {
            return true;
          }
        }

        return false;

      });

      setPokemonList(filterPokemonByType);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <GlobalStyles />
      <Header
        onSubmit={handleSubmit}
      />
      <LocationsBoard
        pokemonList={pokemonList}
        setPokemonList={setPokemonList}
      />
    </>

  );
}

