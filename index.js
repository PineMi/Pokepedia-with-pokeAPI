// PokeAPI GET fetch

fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then(response => response.json())
    .then(data => {
        
        
        data.results.forEach(pokemon => {

            const pokemonCard = document.createElement('div');
            let pokeIDRaw = pokemon.url;
            pokeID = pokeIDRaw.slice(34, pokeIDRaw.lenght).replace(/\D/g, "");
            console.log(pokeID)

            // Structure of the "cards" 
            pokemonCard.innerHTML = `
                <p>${pokemon.name}</p>
                <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png'></img>                
            `
            document.body.appendChild(pokemonCard)

        });
    })

