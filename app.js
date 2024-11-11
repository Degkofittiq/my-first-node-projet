const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const { success,getUniqueId } = require('./helper.js')
let pokemons = require('./mock-pokemon');

const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello Express AYOMAN 😊'))

app.get('/pokemons', (req, res) => {
    message = 'Un tableau de pokemons a bien ete retrouve'
    res.json(success(message, pokemons))
})

app.get('/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    // res.send(`Vous voulez le pokemon ${pokemon.name}`)
    message = 'Le pokemon a bien ete trouve'
    res.json(success(message, pokemon))
})

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, id: id, created: new Date() }
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été créé.`
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokemon ${pokemonUpdated.name} a bien ete mis a jour`
    res.json(success(message, pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokemon ${pokemonDeleted.name} a bien ete supprime.`
    res.json(success(message, pokemonDeleted))
})

app.listen(port, ()=>console.log(`Our application is run, here is the link: http://localhost:${port}`))