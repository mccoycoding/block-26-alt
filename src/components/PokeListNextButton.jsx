import { useState, useEffect} from 'react';

export default function PokeListNextButton({setPokeOffset, pokeOffset, setIsLoading}) {
    return (
        <button className='btn btn-primary' onClick={() =>{
            const newOffset = pokeOffset + 10;
            setPokeOffset(newOffset)
            setIsLoading(true)
        }}>Next Page</button>
    )
}