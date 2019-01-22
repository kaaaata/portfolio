This repo is the codebase for my personal website, [www.kaaaata.com](http://www.kaaaata.com)  

## First Time Setup Instructions
Make sure you have postgres installed with a role "postgres" using password "postgres", and a database called "portfolio" (or use other names and change the development config as desired in knexfile.js)  
<code>createdb portfolio</code> create db  
<code>psql portfolio</code> go to psql command line  
<code>CREATE ROLE postgres WITH LOGIN PASSWORD 'postgres';</code>  create role from psql command line  

## Bootstrapping Instructions
<code>npm install</code> install dependencies  
<code>knex migrate:latest</code> apply latest db migrations  
<code>npm run server</code> to start Express server proxied at [localhost:4000](http://localhost:4000)  
<code>npm start</code> to start the React app at [localhost:3000](http://localhost:3000)  

<code>[localhost:4000/graphql](http://localhost:4000/graphql)</code> to use GraphiQL for testing  

## package.json scripts
<code>npm run lint</code> run lint excluding rules in .eslintrc.json  
<code>npm run build</code> not useful to run locally. automatically run when pushing to heroku  
<code>npm run eject</code> I don't see this project benefiting from ejecting  
<code>npm run test</code> maybe tests will be useful eventually...but not now  

## Database and Migration Tips
This project uses Postgres with Knex  
<code>knex migrate:make migration_name</code> create a local migration  
<code>knex migrate:latest</code> apply latest db migrations  
note: edited migration files aren't executed with knex migrate:latest unless rolled back  
<code>knex migrate:rollback</code> roll back latest batch of migrations  
<code>dropdb portfolio</code> delete database  
<code>createdb portfolio</code> create database  

Psql Command line  
<code>\dt</code>"show tables;"  
<code>\q</code>"quit;"  

## Heroku Deployment Instructions
Ensure Procfile reads: <code>web: node server/index.js</code>  
Ensure all code to be deployed is committed  
<code>git push heroku master</code> (if on master) or <code>git push heroku branch_name:master</code>  
The site is hosted at [kaaaata.herokuapp.com](https://kaaaata.herokuapp.com) and I have a registered domain [www.kaaaata.com](http://www.kaaaata.com) which points to it  

## Heroku Postgres Useful Commands
<code>heroku pg:reset DATABASE_URL</code> drop heroku db (DATABASE_URL is a word, NOT a variable here.)  
<code>heroku run knex migrate:latest</code> syntax to run knex commands on heroku  
<code>heroku pg:psql</code> go to heroku psql command line  

## Additionally...
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  
