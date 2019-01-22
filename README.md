This project is the codebase for my personal website, [www.kaaaata.com](http://www.kaaaata.com)  

## Bootstrapping Instructions
Ensure package.json has: <code>"proxy": "http://localhost:4000"</code>  
<code>npm run server</code> to start Express server with GraphQL endpoint at localhost:4000  
<code>npm run start</code> to start the React app at localhost:3000  

## Heroku Deployment Instructions
Ensure package.json DOES NOT have: <code>"proxy": "http://localhost:4000"</code>  
Ensure Procfile reads: <code>web: node server/index.js</code>  
Ensure all code to be deployed is committed  
<code>git push heroku master</code> (if on master) or <code>git push heroku branch_name:master</code>  
The site is hosted at [kaaaata.herokuapp.com](https://kaaaata.herokuapp.com) and I have a registered domain [www.kaaaata.com](http://www.kaaaata.com) which points to it  

## Database and Migration Instructions
This project uses Postgres with Knex  

<code>knexfile.js</code> contains config information such as database name "portfolio", and postgres role username/password "postgres"/"postgres"
<code>CREATE ROLE postgres WITH LOGIN PASSWORD 'postgres';</code> if role does not currently exist
todo: look into more scalable/reasonable implementations of knex/postgres configs...

<code>psql portfolio</code> to open psql command line  
<code>\q</code> to quit psql command line  

<code>knex migrate:make migration_name</code> to create a local migration  
<code>knex migrate:latest</code> to run a batch of migrations locally  
<code>knex migrate:rollback</code> to roll back the latest batch of migrations locally  
note: don't edit a migration file after it has been run, because it won't do the new stuff. instead, create a new migration. however, the same migration file can be run many times.  
todo: figure out migrations on prod DB (Postgres hosted on Heroku)  

While local DB is small, which will probably be always, the following commands are useful:  
<code>dropdb portfolio</code>  to delete the database  
<code>createdb portfolio</code>  to create the database (empty)  
<code>knex migrate:latest</code>  to apply all migrations  

## Heroku Database Useful Commands
<code>heroku pg:reset DATABASE_URL</code> drop heroku db (DATABASE_URL is NOT a variable here.)
<code>heroku run knex migrate:latest</code> syntax to run latest knex migrations
<code>heroku pg:psql</code>go to heroku psql command line
<code>\dt</code>"show tables;"
<code>\q</code>"quit;"

## Other useful scripts
<code>npm run lint</code> to run lint excluding rules in .eslintrc.json  

## Other not-so-useful scripts
<code>npm run build</code> not useful to run locally. automatically run when pushing to heroku  
<code>npm run eject</code> I don't see this project benefiting from ejecting  
<code>npm run test</code> maybe tests will be useful eventually...but not now  

## Additionally...
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  
