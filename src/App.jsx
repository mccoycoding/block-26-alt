import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PokeList from './components/PokeList'
import SinglePokemonView from './components/SinglePokemonView'

function App() {
  const [selectedPokemonName, setSelectedPokemonName] = useState(null);
  const [pokemonObj, setPokemonObj] = useState({})
  
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
      {
        selectedPokemonName ? (
          <SinglePokemonView pokemonObj={pokemonObj} selectedPokemonName={selectedPokemonName} setSelectedPokemonName={setSelectedPokemonName}/>
        ) : (
          <PokeList setSelectedPokemonName={setSelectedPokemonName}/>
        )
      }
    </>
  )
}

export default App
