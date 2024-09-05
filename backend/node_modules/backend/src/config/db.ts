import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Libreria_Online',
    password: 'Bloodborne1!',
    port: 5432,
});



export const db = {
    query: (text: string, params?: any[]) => pool.query(text, params),
  };
  
  export const dbConnect = async () => {
    try {
      await pool.connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database', error);
    }
  };