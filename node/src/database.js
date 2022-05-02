import { Client } from 'pg';

const databaseClient = new Client({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

databaseClient.connect()
  .then(() => console.log('Database connected'))
  .catch(console.log);

export { databaseClient };
