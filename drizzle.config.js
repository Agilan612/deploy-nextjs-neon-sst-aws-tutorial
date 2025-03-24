const drizzleConfig = {
  dialect: "postgresql",
  schema: "./src/app/lib/schema.js",
  out: "./src/migrations",
}

export default drizzleConfig;
