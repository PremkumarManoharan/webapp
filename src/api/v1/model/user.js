import { sequelize, createDatabase } from "../config/dbConfig.js"
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

}, {
  updatedAt: 'account_updated',
  createdAt: 'account_created'
});




const syncUserModel = async () => {
  console.log(process.env.NODE_ENV);
  try {
    if(process.env.NODE_ENV === "test"){
      await User.sync({ force : true });
      global.db_status = true;
    }else{
      await User.sync({ alert: true });
      global.db_status = true;
    }
   
  } catch (error) {
    if (error.name === 'SequelizeConnectionError') {
      console.log(`Database ${process.env.PG_DB} does not exist. Creating...`);
      try {
        await createDatabase();
        syncUserModel();
      } catch (error) {
        console.log('Unable to connect to the database: waiting..Retry in 5sec');
        setTimeout(syncUserModel, 5000);
      }
    } else {
      console.log('Unable to connect to the database: waiting..Retry in 5sec');
      setTimeout(syncUserModel, 5000);
    }
  }
}

if (!global.db_status){
 syncUserModel();
}
