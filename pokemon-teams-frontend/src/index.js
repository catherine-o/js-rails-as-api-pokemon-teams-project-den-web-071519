const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const showPage = () => {
    getTrainers()
    getPokemon()
}

const getTrainers = () => {
    fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(listTrainers)
        .catch(error => console.log(error))
}

const listTrainers = (trainers) => {
    trainers.forEach(createCard)
}

const createCard = (trainer) => {
    const card = document.createElement('div')
    card.className = 'card'
    card.setAttribute('data-id', `${trainer.id}`)
    const trainerName = document.createElement('p')
    trainerName.innerText = trainer.name
    card.appendChild(trainerName)
    const pokemonSection = document.querySelector('main')
    pokemonSection.appendChild(card)
    createAddButton(card, trainer)
    createPokeUL(card)
}

const createPokeUL = (card) => {
    const pokeTeamList = document.createElement('ul')
    card.appendChild(pokeTeamList)
}

const createAddButton = (card, trainer) => {
    const addButton = document.createElement('button')
    addButton.innerText = 'Add Pokemon'
    addButton.setAttribute('data-trainer-id', `${trainer.id}`)
    card.appendChild(addButton)
    createAddEvent(addButton)
}

const createAddEvent = (button) => {
    button.addEventListener('click', addNewPokemon)
}

const addNewPokemon = () => {
    const trainerId = event.target.dataset.trainerId
    const cardUL = event.target.nextElementSibling
    if (cardUL.childElementCount < 6) {
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'trainer_id': trainerId
            })
        }
        fetch(POKEMONS_URL, config) 
            .then(response => response.json())
            .then(renderPokemon)
    } else {
        alert('Poke team already full!')
    }
}

const getPokemon = () => {
    fetch(POKEMONS_URL)
        .then(response => response.json())
        .then(listPokemons)
}

const listPokemons = (pokemons) => {
    pokemons.forEach(renderPokemon)
}

const renderPokemon = (pokemon) => {
    const trainerCard = document.querySelector(`.card[data-id='${pokemon.trainer_id}']`)
    const pokeTeamList = trainerCard.querySelector('ul')
    const pokeLI = document.createElement('li')
    const release = createReleaseButton(pokemon)
    pokeLI.innerText = `${pokemon.nickname} (${pokemon.species})`
    pokeLI.appendChild(release)
    pokeTeamList.appendChild(pokeLI)
}

const createReleaseButton = (pokemon) => {
    const releaseButton = document.createElement('button')
    releaseButton.innerText = 'Release'
    releaseButton.className = 'release'
    releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`)
    createReleaseEvent(releaseButton)
    return releaseButton
}

const createReleaseEvent = (button) => {
    button.addEventListener('click', releasePokemon)
}

const releasePokemon = () => {
    const pokemonId = event.target.dataset.pokemonId
    let config = {
        method: 'DELETE'
    }
    fetch(POKEMONS_URL + '/' + pokemonId, config)
        .then(event.target.parentElement.remove())
}



showPage()