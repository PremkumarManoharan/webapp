import sequelize from "../config/dbConfig.js"
import { DataTypes } from "sequelize";


export const User = sequelize.define('User', {
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

let db_status = false;

const syncUserModel  = async () => {
  try {
    await User.sync({ force: true });
    db_status =  true;
  } catch (error) {
    console.error('Unable to connect to the database: waiting..Retry in 5sec');
    setTimeout(syncUserModel, 5000);
  }
}

if(!db_status){
  syncUserModel();
}
