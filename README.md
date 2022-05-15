# Project Title : store front

its a simple store to sell products online

##### package installation instructions
    
    ## use   $npm install command to install all packages the project needs

##### how to setup and connect to the database

    ## Use user name : postgres  and password 12345 for postgres user 
    ## if you want to change it ,, you can change in .env file
    ## create database called store
    ## SERVER = 127.0.0.1
    ## PORT : 3000
    # run migrations using the command  >> $ db-migrate up
    # run seeding to store some dummy data for test the api using the command >> $ npm run seed
    # use the email and password from the data you stord by seeding
        > email : daliaahmed@gmail.com
        > password : dalia123
    


##### To build the project for production

    $ npm run build

##### To Run the code formatter and Eslint

    $ npm run lint
    $ npm run lint:fix 

##### Running the project in development

    # run the project 
       $ npm run start 

    # to test all api routes ,, this is a postman collection
      https://www.getpostman.com/collections/4af28eafaac6678013a1
      

##### Build the project then running the tests

    $ npm run test
   

##### Running the project in production

    $ node build/.


##### to run everything make sure that you have id 1 of user , products , cities , countries and categories
   this already will store into data base when you run seeds


##### you will find any type used inside \src\middlewares\validation\api\user\update.ts

here im using express validator package to validate inputs and from the package im using parameter with type any

- im using models to interact with database ,, and controllers to make my functionality 
- im using routes folder to separate routes from models and controllers
- im using express-validator to validate inputs ,, i made separate validation files inside middlewares/validation
