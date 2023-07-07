import React, { useState, useEffect } from 'react';
import PokeRow from './PokeRow';
import PokeListNextButton from './PokeListNextButton';
import PokeListPrevButton from './PokeListPrevButton';
import PageJump from './PageJump';


export default function PokeList({ pokemonObj, pokeOffset, setPokeOffset, setSelectedPokemonName, setSelectedPokemonId ,setIsSideLoading }) {
  const [pokeList, setPokeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${pokeOffset}`);
        const data = await response.json();
        setPokeList(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPokemon();
  }, [pokeOffset]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Wait for 10 seconds (10000 milliseconds)

    return () => {
      clearTimeout(timeout); // Clear the timeout if the component unmounts or the dependency changes
    };
  }, [pokeList]);

  return (
    <table className='table table-bordered align-middle table-striped table-hover mx-3'>
      <thead>
        <tr>
          <th colSpan="4" scope='col'>PokéDex</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope='col'>Pokedex#</td>
          <td scope='col'>Name</td>
          <td scope='col'>Sprite</td>
          <td scope='col'>Type</td>
        </tr>
        {isLoading ? (
          <tr>
            <td colSpan="4">
              <img className='animate__animated animate__rotateIn' src="https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png" alt="spinning pokeball" width='25%'/>
            </td>
          </tr>
        ) : (
          !isLoading &&
          pokeList.map(pokemon => (
            <PokeRow  pokemonObj={pokemonObj} setIsSideLoading={setIsSideLoading} setSelectedPokemonName={setSelectedPokemonName} setSelectedPokemonId={setSelectedPokemonId} key={pokemon.name} pokemon={pokemon} />
          ))
        )}
        <tr>
          <td colSpan={2}><PokeListPrevButton setPokeOffset={setPokeOffset} pokeOffset={pokeOffset} setIsLoading={setIsLoading}/></td>
          <td colSpan={2}><PokeListNextButton setPokeOffset={setPokeOffset} pokeOffset={pokeOffset} setIsLoading={setIsLoading}/></td>
        </tr>
        <tr>
          <th colSpan={4}>Jump to Page</th>
        </tr>
        <tr>
          <PageJump setPokeOffset={setPokeOffset} pokeOffset={pokeOffset} setIsLoading={setIsLoading}/>
        </tr>
      </tbody>
    </table>
  );
}
