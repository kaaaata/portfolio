module.exports = {
  production: {
    client: 'pg',
    debug: true,
    connection: {
      database: process.env.DATABASE_URL,
      timezone: "-08:00"
    },
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
      password: 'postgres',
      timezone: "pst"
    }
  },
};
