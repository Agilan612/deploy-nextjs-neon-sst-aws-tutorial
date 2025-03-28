import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { migrate } from "drizzle-orm/postgres-js/migrator"
// only do this in Node v21 and below
import ws from 'ws';
import * as schema from "../lib/schema";
import getSecret from "../lib/secrets"


async function performMigration() {
  const dbUrl = await getSecret("DATABASE_URL");
  if (!dbUrl) {
    return;
  }
  // connect to Neon via websocket
  neonConfig.webSocketConstructor = ws;

  const pool = new Pool({ connectionString: dbUrl });
  pool.on('error', (err) => console.error(err)); // deal with e.g. re-connect
  // ...

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const db = await drizzle(client, { schema })
    await migrate(db, { migrationsFolder: "src/migrations"});
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }

  await pool.end();
}
// if(require.main === module){
//   console.log("Running migrations")
  performMigration().then((val) => {
    console.log("Migration performed");
    process.exit(0)
  }).catch((err) => {
    console.log(`erro: ${err}`);
    process.exit(1)
  })
// }
