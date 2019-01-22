module.exports = {
  production: {
    client: 'pg',
    debug: true,
    connection: process.env.DATABASE_URL,
    ssl: true,
    migrations: {
      commands: 'migrations'
    },
  },
  development: {
    client: 'postgresql',
    connection: {
      database: 'portfolio',
      user: 'postgres',
      password: 'postgres'
    }
  },
};
