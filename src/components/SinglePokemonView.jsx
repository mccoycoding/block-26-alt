import { useState, useEffect } from "react";

export default function SinglePokemonView({ pokemonObj, species, selectedPokemonName }) {


    if (!pokemonObj || Object.keys(pokemonObj).length === 0 || !species || Object.keys(species).length === 0) {
        // Handle the case when the pokemonObj is empty or not available yet
        return <div>Loading...</div>;
      }


    // Uncomment for to view pokemonObj and species objects
    console.log(pokemonObj)
    console.log(species.name);

    //Set short names for useful table variables
    const pokeName = species.name.charAt(0).toUpperCase() + species.name.slice(1)
    const type1 = pokemonObj.types[0].type.name.charAt(0).toUpperCase() + pokemonObj.types[0].type.name.slice(1);
    let type2 = null
    const abilities = pokemonObj.abilities;
    const originalFlavorText = species.flavor_text_entries;
    const englishFlavorText = originalFlavorText.find(entry => entry.language.name === 'en');
    let flavorText = "???";
    if (englishFlavorText) {
        flavorText = englishFlavorText.flavor_text.replace(/[\n\f]/g, " ").replace("POKéMON", "pokémon");
    };
    
    //If the length of the types object is greater than 1, we define our second type
    if (pokemonObj.types.length > 1){
        type2 = pokemonObj.types[1].type.name.charAt(0).toUpperCase() + pokemonObj.types[1].type.name.slice(1);
    }
    return(
        <>
        <div> 
            <div>
                <h1>{pokeName + ` #${pokemonObj.id}`}</h1>
                <img width="100%" src={pokemonObj.sprites.other["official-artwork"].front_default} />
            </div>
            <div>
                <h5>Summary</h5>
                <article>
                    {flavorText ? flavorText : "???"}
                </article>
            </div>
            <div style={{display: 'inline-block'}}>
                <table className='table'>
                    <thead>
                        <tr>
                            <th colSpan={3}>{pokeName}'s Stats</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colSpan={3}>Type</th>
                        </tr>
                        <tr>
                            {/*If type2 is true, then they're a dual type pokemon. Else they're single typed*/}
                           {type2 ? <td colSpan={3}>{type1}/{type2}</td> : <td colSpan={2}>{type1}</td>}
                        </tr>
                        <tr>
                            <th>Height</th>
                            <th>Weight</th>
                        </tr>
                        <tr>
                            <td>{pokemonObj.height/10 + "m"}</td>
                            <td>{pokemonObj.weight/10 + "kg"}</td>
                        </tr>
                        <tr>
                            <th colSpan={3}>Abilities</th>
                        </tr>
                        {abilities.map((ability, index) => (
                            <tr key={ability.ability.name + index}><td colSpan={3}>{ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</td></tr>
                        ))}
                        <tr>
                            <th colSpan={3}>Habitat</th>
                        </tr>
                        <tr>
                            {species.habitat === null ? (<td colSpan={3}>None</td>) : (<td colSpan={3}>{species.habitat.name.charAt(0).toUpperCase() + species.habitat.name.slice(1)}</td>)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}