import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PokeList from './components/PokeList'
import SinglePokemonView from './components/SinglePokemonView'

function App() {
  const [selectedPokemonName, setSelectedPokemonName] = useState(null);
  const [pokemonObj, setPokemonObj] = useState({})
  const [pokeOffset, setPokeOffset] = useState(0)
  
  //get useful information for SinglePokemonView
  useEffect(() => {
    async function fetchPokemonInfo() {
      if (!selectedPokemonName) return

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`);
        const data = await response.json()
        setPokemonObj(data)
      } catch (error) {
        
      }
    }
    fetchPokemonInfo()
  }, [selectedPokemonName])

  return (
    <>
      {/* If selectedPokemonName is true, display the singlePokemonView, else display the list. */}
      {
        selectedPokemonName ? (
          <SinglePokemonView pokemonObj={pokemonObj} selectedPokemonName={selectedPokemonName} setSelectedPokemonName={setSelectedPokemonName}/>
        ) : (
          <PokeList pokeOffset={pokeOffset} setPokeOffset={setPokeOffset} setSelectedPokemonName={setSelectedPokemonName}/>
        )
      }
    </>
  )
}

export default App
