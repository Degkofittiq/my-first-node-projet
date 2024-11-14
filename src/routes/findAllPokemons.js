const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if (req.query.name || req.query.limit) {
      const name = req.query.name ?? ''
      if (name && name.length < 2) {
        message = 'Minmum 2 caracteres'
        return res.status(400).json({message})
      }
      const limit = parseInt(req.query.limit) ?? 5
      // return Pokemon.findAll({ 
      //   where: {
      //     name: { // 'name' est la propriete du mode pokemon
      //       [Op.like]: `%${name}%` // 'name' est le critere de la recherche
      //     }  
      //   },
      //   limit: 5
      // }) 
      return Pokemon.findAndCountAll({ 
        where: {
          name: { // 'name' est la propriete du mode pokemon
            [Op.like]: `%${name}%` // 'name' est le critere de la recherche
          }
        },
        order: ['name'],
        limit: limit
      })
      .then( ({count, rows}) => {
        const message = `Il y a ${count} pokemons qui  correspondent au terme ${name}`
        res.json( { message, data: rows})
      })    
    }
    else{
      // Pokemon.findAll()
      // .then(pokemons => {
      //   const message = 'La liste des pokémons a bien été récupérée.'
      //   res.json({ message, data: pokemons })
      // })
      Pokemon.findAll({ order: ['name'] })
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = 'Erreur lors de la recuperation de la liste des pokemons'
        res.status(500).json({message, data: error})
      })
    }
  })
}