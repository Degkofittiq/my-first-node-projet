const express = require('express')
const pokemons = require('./mock-pokemon');

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello Express AYOMAN 😊'))

app.get('/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    // res.send(`Vous voulez le pokemon ${pokemon.name}`)
    res.json(pokemon)
})

app.listen(port, ()=>console.log(`Our application is run, here is the link: http://localhost:${port}`))