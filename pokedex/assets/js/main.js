(async function () {
    const olPokemons = document.querySelector(".pokemons");
    const batchSize = 25;

    const allPromises = [];

    for (let i = 1; i <= 151; i += batchSize) {
        const batchPromises = [];

        for (let j = i; j < i + batchSize && j <= 151; j++) {
            const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${j}`)
                .then(response => response.json())
                .then(data => {
                    const pokemonId = data.id;
                    const pokemonName = capitalizeFirstLetter(data.name);
                    const pokemonImageUrl = data.sprites.front_default;
                    const pokemonTypes = data.types.map(type => type.type.name);
            // Criar uma li class pokemon
            const liPokemon = document.createElement("li")
            liPokemon.className = "pokemon"
            liPokemon.addEventListener("click", () => {
                window.location.href = "detail.html"
            })
            // Adicionar essa li na ol pokemons
            olPokemons.appendChild(liPokemon)
            // Criar a span Number e Name
            const spanNumber = document.createElement("span")
            const spanName = document.createElement("span")
            spanNumber.className = "number"
            spanName.className = "name"

            if (pokemonId < 10) {
                spanNumber.textContent = `#00${pokemonId}`
            } else if (pokemonId < 100) {
                spanNumber.textContent = `#0${pokemonId}`
            } else {
                spanNumber.textContent = `#${pokemonId}`
            }
            liPokemon.appendChild(spanNumber)

            spanName.textContent = pokemonName
            liPokemon.appendChild(spanName)

            let detailDiv = document.createElement("div")
            detailDiv.className = "detail"
            liPokemon.appendChild(detailDiv)
            
            let olTypes = document.createElement("ol")
            olTypes.className = "types"
            detailDiv.appendChild(olTypes)
            
            if (pokemonTypes.length > 1) {
                let liTypeOneText = pokemonTypes[0]
                let liTypeTwoText = pokemonTypes[1]
                let liTypeOne = document.createElement("li")
                let liTypeTwo = document.createElement("li")
                liTypeOne.className = "type"
                liTypeTwo.className = "type"
                liTypeOne.classList.add(`${pokemonTypes[0]}`)
                liTypeOne.textContent = liTypeOneText
                liTypeTwo.classList.add(`${pokemonTypes[1]}`)
                liTypeTwo.textContent = liTypeTwoText
                olTypes.appendChild(liTypeOne)
                olTypes.appendChild(liTypeTwo)
            } else {
                let liTypeOneText = pokemonTypes[0]
                let liTypeOne = document.createElement("li")
                liTypeOne.className = "type"
                liTypeOne.classList.add(`${pokemonTypes[0]}`)
                liTypeOne.textContent = liTypeOneText
                olTypes.appendChild(liTypeOne)
            }
            if (pokemonTypes.length === 1){
                liPokemon.classList.add(`${pokemonTypes[0]}`)
            } else {
                liPokemon.classList.add(`${pokemonTypes[0]}${pokemonTypes[1]}`)
            }
            

            let pokeballBack = document.createElement("img")
            pokeballBack.className = "pokeballBackground"
            pokeballBack.src = ("assets/pokeball.svg")
            let pokeImg = document.createElement("img")
            pokeImg.src = pokemonImageUrl
            pokeImg.className = "unique"
            detailDiv.appendChild(pokeImg)
            detailDiv.appendChild(pokeballBack)
            return {
                id: pokemonId,
                element: liPokemon, // ou qualquer outra informação que você precise
            };
        });

    batchPromises.push(promise);
}

allPromises.push(...batchPromises);
}

const results = await Promise.all(allPromises);

// Ordena os resultados com base nos IDs dos Pokémon
results.sort((a, b) => a.id - b.id);

// Adiciona os elementos ordenados à lista
for (const result of results) {
olPokemons.appendChild(result.element);
}
})();

function capitalizeFirstLetter(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}
