import Sequelize from 'sequelize';
import dotenv from "dotenv";
import Client from 'pg/lib/client.js';
import { logger } from './loggerConfig.js';

dotenv.config()

logger.info("Environment Variables are configured");

export const sequelize = new Sequelize(
    process.env.PG_DB,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect: 'postgres',
    }
);

export const createDatabase = async () => {
    const client = new Client({
      host: 'localhost',
      database: 'postgres',
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
    });
  
    try {
      await client.connect(); // Connect to the default 'postgres' database
      await client.query(`CREATE DATABASE "${process.env.PG_DB}"`); // Create new database
      logger.info(`Database ${process.env.PG_DB} created successfully.`);
    } catch (error) {
      logger.error(`Failed to create database ${process.env.PG_DB}:`, error);
      process.exit();
    } finally {
      await client.end(); 
    }
};
