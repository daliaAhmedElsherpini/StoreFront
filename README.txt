# Project Title : store front

its a simple store to sell products online

## package installation instructions
    
    ## use   $npm install command to install all packages the project needs

## how to setup and connect to the database

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
    


## To build the project for production

    $ npm run build

## To Run the code formatter and Eslint

    $ npm run lint
    $ npm run lint:fix 

## Running the project in development

    # run the project 
       $ npm run start 

    # to test all api routes ,, this is a postman collection
      https://www.getpostman.com/collections/4af28eafaac6678013a1
      

## Build the project then running the tests

    $ npm run test
   

## Running the project in production

    $ node build/.


## to run everything make sure that you have id 1 of user , products , cities , countries and categories
   this already will store into data base when you run seeds


## you will find any type used inside \src\middlewares\validation\api\user\update.ts

here im using express validator package to validate inputs and from the package im using parameter with type any

## im using models to interact with database ,, and controllers to make my functionality 
## im using routes folder to separate routes from models and controllers
## im using express-validator to validate inputs ,, i made separate validation files inside middlewares/validation


## routes and HTTP verb 

  # login  > http://127.0.0.1:3000/api/auth/login           POST
  # register  > http://127.0.0.1:3000/api/auth/register     POST

  # profile  > http://127.0.0.1:3000/api/user/1              GET   
  # update  > http://127.0.0.1:3000/api/user/1               PUT


  # user addresses  > http://127.0.0.1:3000/api/user-addresses/1           GET    1 here is user id to get all his shipping addresses
  # address         > http://127.0.0.1:3000/api/user-addresses/show/1      GET    get address details
  # add             > http://127.0.0.1:3000/api/user-addresses             POST  
  {
        "user_id": 1,
        "city_id": 1,
       "country_id":1,
        "street": "mohammed bin zayed street",
        "flat_number": "1",
        "address": "elshamkha abu dhabi united arab emarites",
        "email": "dalia@gmail.com",
        "phone_number": "376745654563"
    }

  # update          > http://127.0.0.1:3000/api/user-addresses/1           PUT  
   {
        "user_id": 1,
        "city_id": 1,
        "country_id":1,
        "street": "mohammed bin zayed street",
        "flat_number": "1",
        "address": "elshamkha abu dhabi united arab emarites",
        "email": "dalia@gmail.com",
        "phone_number": "376745654563"
    }

  # delete          > http://127.0.0.1:3000/api/user-addresses/1           DELETE


 # get all products          > http://127.0.0.1:3000/api/products            GET
 # products details          > http://127.0.0.1:3000/api/products/1          GET
 # products reviews          > http://127.0.0.1:3000/api/reviews/1           GET  1 here is product id 
 # add review to product     > http://127.0.0.1:3000/apireviews              POST
 {
    "user_id" : 1,
    "product_id" : 1 ,
    "rate": 4,
    "review" : "nice"

}


 # get all categories                 > http://127.0.0.1:3000/api/categories            GET
 # get all category products          > http://127.0.0.1:3000/api/categories/1          GET

 
 # get all countries                 > http://127.0.0.1:3000/api/countries           GET
 # get all country cities            > http://127.0.0.1:3000/api/countries/1          GET


 # send contact message              > http://127.0.0.1:3000/api/contact                POST
 {
    "name" : "dalia",
    "email" : "dalia@yahoo.com",
    "subject" : "new product",
    "message" : "nice"
}


 # get all FAQ'S about the app       > http://127.0.0.1:3000/api/faqs               GET
 # Details                           > http://127.0.0.1:3000/api/faqs/1             GET

 # Show wishlist                         > http://127.0.0.1:3000/api/wishlist/1           GET    1 is user id 
 # add or remove from wishlist           > http://127.0.0.1:3000/api/wishlist             POST   ,, Takes user id and product id


 # Show cart                           > http://127.0.0.1:3000/api/cart/1           GET    1 is user id 
 # add to cart                         > http://127.0.0.1:3000/api/cart             POST   ,, Takes user id and product id
 # delet from cart                     > http://127.0.0.1:3000/api/cart/1           DELETE   ,, 1 is cart record id 
 # edit cart                           > http://127.0.0.1:3000/api/cart             PUT
 {
    "user_id" : 1,
    "product_id" : 1 ,
    "quantity" : 5
}


 # app info                       > http://127.0.0.1:3000/api/appinfo          GET  


 # Show user oreder                    > http://127.0.0.1:3000/api/orders/1           GET    1 is user id 
 # order details                       > http://127.0.0.1:3000/api/orders/show/1      GET    1 is order id 
 # make order                          > http://127.0.0.1:3000/api/orders             POST 
 {
    "user_id" : 1 ,
    "address_id" : 1,
    "payment_method" : "cash"
}

 # cancel order                      > http://127.0.0.1:3000/api/orders/1           PUT    ,, 1 is order id 











