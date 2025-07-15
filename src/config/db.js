import { neon } from '@neondatabase/serverless'; 
import 'dotenv/config';

const db_url = process.env.DATABASE_URL;

// Creates a SQL connection using our DB URL
export const sql = neon(db_url);

export async function connectdb() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title  VARCHAR(255) NOT NULL,
            amount  DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
          )`;

        console.log('Database connected successfully');
    } catch (error) {
      console.error("Database connection failed:", error);
      process.exit(1); // status code 1 means failure, 0 success
    }
  
}
    