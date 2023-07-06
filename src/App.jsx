import { useState, useEffect } from 'react'
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
    <div className='container-fluid text-center mx-4 my-4'>

      <PokeList pokeOffset={pokeOffset} setPokeOffset={setPokeOffset} setSelectedPokemonName={setSelectedPokemonName}/>

      <div className='offcanvas offcanvas-end' tabIndex='-1' id="offcanvasRight" aria-labelledby='offcanvasRightLabel'>
        <div className="offcanvas-header">
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <h1 className='offcanvas-title' id="offcanvasRightLabel"></h1>
        </div>
          <div className="offcanvas-body">
          <SinglePokemonView pokemonObj={pokemonObj} selectedPokemonName={selectedPokemonName} setSelectedPokemonName={setSelectedPokemonName}/>
        </div>
      </div>
    </div>
  )
}

export default App
