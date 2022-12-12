import { useState, useEffect } from 'react';
import { GlobalStyles } from './assets/styles/GlobalStyles';
import { Header } from './components/Header';
import { LocationsBoard } from './components/LocationsBoard';
import { fetchPokemon } from './services/fetchPokemon';
import { fetchPokemonList } from './services/fetchPokemonList';

export default function App() {

  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllPokemons() {
    const getAllPokemons = await fetchPokemon('?limit=10000');
    setAllPokemons(getAllPokemons.data);
  }

  //ok
  async function handleSubmit(filterData) {

    setIsLoading(true);

    try {

      //recebe os parametros dos filtros do header
      const filter = {
        generation: filterData.generation,
        type: filterData.types,
        move: filterData.move,
      };

      console.log(filter.move);

      //busca pokemons pelo filtro geração (uso o link da geração)
      const pokemonListData = await fetchPokemonList(filter.generation, allPokemons.results);

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

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Header
        onSubmit={handleSubmit}
      />
      <LocationsBoard
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        pokemonList={pokemonList}
        setPokemonList={setPokemonList}
      />
    </>

  );
}

