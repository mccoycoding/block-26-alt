import { useState, useEffect } from 'react';
import PokeList from './components/PokeList';
import Header from './components/Header';
import SinglePokemonView from './components/SinglePokemonView';

function App() {
  const [selectedPokemonName, setSelectedPokemonName] = useState(null);
  const [pokemonObj, setPokemonObj] = useState({})
  const [species, setSpecies] = useState({})
  const [pokeOffset, setPokeOffset] = useState(0)
  const [isSideLoading, setIsSideLoading] = useState(true)
  
  
  //get useful information for SinglePokemonView
  useEffect(() => {
    async function fetchPokemonInfo() {
      if (!selectedPokemonName) return

      try {
        const response_pokemonObj = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`);
        const response_pokemonSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemonName}`)
        const data_pokemonObj = await response_pokemonObj.json()
        const data_pokemonSpecies = await response_pokemonSpecies.json()
        setPokemonObj(data_pokemonObj)
        setSpecies(data_pokemonSpecies)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPokemonInfo()
  }, [selectedPokemonName])

  return (
    <div>
    <Header />
    <div id="table-div" className='container-fluid text-center'>
      <PokeList pokeOffset={pokeOffset} setPokeOffset={setPokeOffset} setSelectedPokemonName={setSelectedPokemonName} setIsSideLoading={setIsSideLoading}/>
      <div className='offcanvas offcanvas-end' tabIndex='-1' id="offcanvasRight" aria-labelledby='offcanvasRightLabel'>
        <div className="offcanvas-header">
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => {
          setSelectedPokemonName(null)
          setIsSideLoading(true);
        }}></button>
        <h1 className='offcanvas-title' id="offcanvasRightLabel"></h1>
        </div>
          <div className="offcanvas-body">
          <SinglePokemonView pokemonObj={pokemonObj} species={species} isSideLoading={isSideLoading} setIsSideLoading={setIsSideLoading}/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default App
