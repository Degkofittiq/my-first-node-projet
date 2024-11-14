module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        unique: {
          msg: 'Le nom est déjà pris.'
        }
      },
      username: {
        type: DataTypes.STRING,
        unique: {
          msg: 'Le nom est déjà pris.'
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: 'Cet email existe déjà dans ce systeme.'
        },
        validate: {
            isEmail: {
                msg: 'Veuillez entrer une adresse email valide.'
            }
        }
      },
      password: {
        type: DataTypes.STRING
      }
    })
  }