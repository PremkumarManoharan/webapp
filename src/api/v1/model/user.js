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

export const db_status = false;

const syncUserModel  = async () => {
  try {
    // Synchronize the User table (or any other database operations) after successful connection
    await User.sync({ force: true });
    db_status =  true;
    // Add your code that depends on the database connection here
  } catch (error) {
    console.error('Unable to connect to the database: waiting..Retry in 5sec');
    // Retry the connection after a delay (e.g., 10 seconds)
    setTimeout(syncUserModel, 5000);
  }
}

syncUserModel();
