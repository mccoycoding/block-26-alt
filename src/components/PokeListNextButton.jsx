import { useState, useEffect} from 'react';

export default function PokeListNextButton({setPokeOffset, pokeOffset}) {
    return (
        <button onClick={() =>{
            const newOffset = pokeOffset + 10;
            setPokeOffset(newOffset)
        }}>Next Page</button>
    )
}