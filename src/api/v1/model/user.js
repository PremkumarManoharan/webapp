//TODO: create user model for sequelize
import sequelize from "../config/dbConfig.js"
import { DataTypes } from "sequelize";
const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

},{
    //other model options
    freezeTableName: true,
    updatedAt: 'account_updated',
    createdAt: 'account_created'
});

User.sync({force: true}); //use force only for development purposes

export default User;
