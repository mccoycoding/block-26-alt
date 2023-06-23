import React, { useState, useEffect } from 'react';
import PokeRow from './PokeRow';

export default function PokeList({ setSelectedPokemonName }) {
  const [pokeList, setPokeList] = useState([]);



  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=250');
        const data = await response.json();
        setPokeList(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPokemon();
  }, [pokeList]);



  return (
    <table>
      <thead>
        <tr>
          <th colSpan="4">PokéDex</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Sprite</td>
          <td>PokéDex #</td>
          <td>Type</td>
        </tr>
        {pokeList.map(pokemon => {
            return <PokeRow setSelectedPokemonName={setSelectedPokemonName} key={pokemon.name} pokemon={pokemon} />
        })}
      </tbody>
    </table>
  );
}
