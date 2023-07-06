import React, { useState, useEffect } from 'react';
import PokeRow from './PokeRow';
import PokeListNextButton from './PokeListNextButton';
import PokeListPrevButton from './PokeListPrevButton';

export default function PokeList({ pokeOffset, setPokeOffset, setSelectedPokemonName }) {
  const [pokeList, setPokeList] = useState([]);

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
  }, [pokeList, pokeOffset]);



  return (
    <table className='table table-bordered align-middle table-striped table-hover'>
      <thead>
        <tr>
          <th colSpan="4" scope='col'>PokéDex</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope='col'>Name</td>
          <td scope='col'>Sprite</td>
          <td scope='col'>PokéDex #</td>
          <td scope='col'>Type</td>
        </tr>
        {pokeList.map(pokemon => {
            return <PokeRow setSelectedPokemonName={setSelectedPokemonName} key={pokemon.name} pokemon={pokemon} />
        })}
        <tr>
            <td colSpan={2}><PokeListPrevButton setPokeOffset={setPokeOffset} pokeOffset={pokeOffset} /></td>
            <td colSpan={2}><PokeListNextButton setPokeOffset={setPokeOffset} pokeOffset={pokeOffset} /></td>
        </tr>
      </tbody>
    </table>
  );
}
