const { Pool } = require('pg');
require('dotenv').config();
export const PostgresPoolProvider = {
  provide: 'PG_POOL',
  useFactory: async () => {
    const pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection could not be established
    });

    // Handle connection events
    pool.on('connect', () => {
      console.log('Connected to PostgreSQL database');
    });

    pool.on('error', (error) => {
      console.error('Error connecting to postgres database ', error.message);
    });
    return pool

  },
};
