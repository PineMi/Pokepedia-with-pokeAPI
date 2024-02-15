// PokeAPI GET fetch
let currentExpandedCard = null;

fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0')
    .then(response => response.json())
    .then(data => {
        
        
        data.results.forEach(pokemon => {
            let pokeIDRaw = pokemon.url;
            let pokeID = pokeIDRaw.slice(34, pokeIDRaw.lenght).replace(/\D/g, "");
            console.log(pokeID)


            //Link to the png of the pokemons
            //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png
            
            // Structure of the "cards" 
            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-container')
            pokemonCard.setAttribute("onclick", "togglePokemonInfo(this)")
            
            pokemonCard.innerHTML = `
                <p class="pokemon-name">${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>
                <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokeID}.gif' alt="Pokemon Gif" class="pokemon-photo"></img>
                <div class="additional-info">    
                </div>                
                <p class="identification-paragraph">${pokeID}</p>
            `
            
            // Here, all the information about the pokemon will be added
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}/`)
                .then(response => response.json())
                .then(AdditionalData => {

                    // Pokémon Type
                    let firstType = AdditionalData.types[0].type.name;
                    let secondType = AdditionalData.types[1]?.type.name;
                    if (secondType === undefined){
                        secondType = "";
                    }

                    // Pokémon 
                    var additionalInfo = pokemonCard.querySelector('.additional-info');
                    additionalInfo.innerHTML = `
                    <p class='${firstType}P-type'>${firstType}</p>
                    <p class='${secondType}P-type'>${secondType}</p>
                    `
                })

            pokemonCard.id = `card${pokeID}`
            document.body.appendChild(pokemonCard)

        });
    })

function togglePokemonInfo(element) {
    
    if (currentExpandedCard && currentExpandedCard !== element) {
        // Close the previously expanded card
        currentExpandedCard.classList.remove('expanded');
        let prevAdditionalInfo = currentExpandedCard.querySelector('.additional-info');
        if (prevAdditionalInfo) {
          prevAdditionalInfo.classList.remove('show');
        }
      }
    
      element.classList.toggle('expanded');
    
      // Find the .additional-info element within the clicked container
      var additionalInfo = element.querySelector('.additional-info');

      additionalInfo.classList.toggle('show');
      currentExpandedCard = element;
}
