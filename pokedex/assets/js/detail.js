function getPokemonDetails(id) {
    const contentSession = document.querySelector(".content")
    const navMenu = document.createElement("div")
    navMenu.className = "nav-menu"


    const spanReturn = document.createElement("span")
    const spanFavorite = document.createElement("span")
    spanReturn.className = "navigator"
    spanFavorite.className = "navigator"
    spanReturn.innerHTML = '<i class="fa-solid fa-arrow-left"></i>'
    spanFavorite.innerHTML = '<i class="fa-regular fa-heart"></i>'
    contentSession.appendChild(navMenu)
    navMenu.appendChild(spanReturn)
    navMenu.appendChild(spanFavorite)


    const pokeDetails = document.createElement("div")
    pokeDetails.className = "poke-details"
    const nameType = document.createElement("div")
    nameType.className = "name-type"

    contentSession.appendChild(pokeDetails)
    pokeDetails.appendChild(nameType)
    const pokemonName = document.createElement("h1")
    pokemonName.innerHTML = `https://pokeapi.co/api/v2/pokemon/${id}`
}

getPokemonDetails()