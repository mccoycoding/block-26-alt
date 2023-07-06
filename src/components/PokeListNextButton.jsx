import { useState, useEffect} from 'react';

export default function PokeListNextButton({setPokeOffset, pokeOffset}) {
    return (
        <button className='btn btn-primary' onClick={() =>{
            const newOffset = pokeOffset + 10;
            setPokeOffset(newOffset)
        }}>Next Page</button>
    )
}