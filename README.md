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
This project uses Postgres with Knex.  
<code>knexfile.js</code> contains config information such as database name "portfolio"  
<code>psql portfolio</code> to open psql command line  
<code>\q</code> to quit psql command line  
<code>knex migrate:make migration_name</code> to create a local migration  
<code>knex migrate:latest</code> to run a batch of migrations locally  
<code>knex migrate:rollback</code> to roll back the latest batch of migrations locally  
todo: figure out migrations on prod DB (Postgres hosted on Heroku)  

## Other useful scripts
<code>npm run lint</code> to run lint excluding rules in .eslintrc.json  

## Other not-so-useful scripts
<code>npm run build</code> not useful to run locally. automatically run when pushing to heroku  
<code>npm run eject</code> I don't see this project benefiting from ejecting  
<code>npm run test</code> maybe tests will be useful eventually...but not now  

## Additionally...
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  
