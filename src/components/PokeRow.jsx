import { useEffect, useState } from "react";
import PokeList from "./PokeList";

export default function PokeRow({ pokemon, setSelectedPokemonName }) {

    const [spriteUrl, setSpriteUrl] = useState("")
    const [pokemonId, setpokemonId] = useState("")
    const [type1, setType1] = useState("")
    const [type2, setType2] = useState("")

    useEffect(() => {
        async function fetchPokemonInfo(pokemonName) {
            try {
              const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
              const data = await response.json();
              //set and update useful variables
              setSpriteUrl(data.sprites.front_default);
              setpokemonId(data.id);
              setType1(data.types[0].type.name);
              if (data.types.length > 1){
                setType2(data.types[1].type.name)
              }
            } catch (error) {
              console.log(error);
              return [];
            }
        }
        fetchPokemonInfo(pokemon.name)
    }, [])

    return (
        <tr data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={() => {
            setSelectedPokemonName(pokemon.name)
        }}>
            {/*Capitalize the first letter*/}
            <td>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</td>
            <td><img src={spriteUrl} /></td>
            <td>{pokemonId}</td>
            {/*If type2 is true, then they're a dual type pokemon. Else they're single typed*/}
            {type2 ? <td>{type1.charAt(0).toUpperCase() + type1.slice(1)}/{type2.charAt(0).toUpperCase() + type2.slice(1)}</td> : <td>{type1.charAt(0).toUpperCase() + type1.slice(1)}</td>}
        </tr>
    )
}