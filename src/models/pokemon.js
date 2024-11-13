/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Ce nomm est deja pris.'
      },
      validate: {
        notEmpty: { msg: 'Le champ name doit conteir au moins 1 caractere !'},
        notNull: { msg: 'Le champ name est requis !' }
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isInt: { msg: 'Uniquement des chiffres sont autorises.' },
        notNull: { msg: 'Les points de vie sont une propriete requise.' },
        min: {
          args: [0],
          msg: 'Le nombre minimale de hp est 0'
        },
        max: {
          args: [999], 
          msg: 'Le nombre maximale de hp est 999'
        }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Le champ Cp doit contenir un entier !' },
        notNull: { msg: 'Le champ ne doit pas etre vide !' },
        min: {
          args: [0],
          msg: 'Le nombre minimale de hp est 0'
        },
        max: {
          args: [99],
          msg: 'Le nombre maximale de hp est 99'
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'Le champ picture doit contenir une URL vers une image !'},
        notNull: { msg: 'Une image est requise !'}
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const types = this.getDataValue('types')
        return typeof types === 'string' ? types.split(',') : []
      },
      set(types) {
        this.setDataValue('types', Array.isArray(types) ? types.join(',') : types)
      },
      validate: {
        isTypesValid(value) {
          if(!value){
            throw new Error('Un pokemon doit avoir au moins un type.')
          }

          if (value.split(',').length > 3) {
            throw new Error('Un pokemon ne peut avoir plus de  3 types.')              
          }
          value.split(',').forEach(type => {
            if (!validTypes.includes(type)) {
              throw new Error(`Le type du pokemon doit etre contenu dans cette liste ${validTypes}`);
              
            }
          });
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: true
  })
}