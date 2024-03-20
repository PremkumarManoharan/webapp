import { sequelize, createDatabase } from "../config/dbConfig.js"
import { DataTypes } from "sequelize";
import { logger } from "../config/loggerConfig.js";



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
  try {
    if(process.env.NODE_ENV === "test"){
      await User.sync({ force : true });
      global.db_status = true;
      logger.info("Database connected succesfully")
    }else{
      await User.sync({ alert: true });
      global.db_status = true;
      logger.info("Database connected succesfully")
    }
   
  } catch (error) {
    if (error.name === 'SequelizeConnectionError') {
      logger.info(`Database ${process.env.PG_DB} does not exist. Creating...`);
      try {
        await createDatabase();
        syncUserModel();
      } catch (error) {
        logger.warn('Unable to connect to the database: waiting..Retry in 5sec');
        setTimeout(syncUserModel, 5000);
      }
    } else {
      logger.warn('Unable to connect to the database: waiting..Retry in 5sec');
      setTimeout(syncUserModel, 5000);
    }
  }
}

if (!global.db_status){
 syncUserModel();
}
