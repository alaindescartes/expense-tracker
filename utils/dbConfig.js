import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Log the DB URL to verify it's being loaded correctly
console.log('DB_URL:', process.env.DB_URL);

// Initialize the connection using the environment variable
const sql = neon(process.env.NEXT_PUBLIC_DB_URL);
export const db = drizzle(sql, { schema });

export default db;
