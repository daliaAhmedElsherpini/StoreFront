################## DATABASE SCHEMA  ####################

  # users table 
     - id : serial primary key (bigint)
     - name : varchar(255)
     - email : varchar(255) unique
     - phone : varchar(255) unique
     - password : varchar(255)
     - country_id : foriegn key ,  bigint
     - city_id : foriegn key , bigint
     - status : boolean
     - created_at : timestamp

  # countries table
     - id : serial primary key (bigint)
     - name : varchar(100)
     - created_at : timestamp

  # cities table
     - id : serial primary key (bigint)
     - name : varchar(100)
     - country_id : foriegn key (bigint)
     - created_at : timestamp

  # user addresses table ,,, its shipping addresses for the user

     - id : serial primary key (bigint)
     - user_id : foriegn key(bigint)
     - country : varchar(255)
     - city : varchar(255)
     - street : varchar(255)
     - flat_number : varchar(255)
     - address : varchar(255)
     - phone_number : varchar(255)
     - email : varchar(255)


  # categories table
     - id : serial primary key (bigint)
     - name : varchar(100)
     - image : varchar(255)
     - description : varchar(255)
     - created_at : timestamp

   # products table
     - id : serial primary key (bigint)
     - category_id : foriegn key (bigint)
     - title : varchar(255)
     - image : varchar(255)
     - description : text
     - stock : integer
     - price : integer
     - sale_price : integer , null
     - created_at : timestamp

  # reviews  ,, its many to many table between products and users with extra info
     - id : serial primary key (bigint)
     - user_id : foriegn key (bigint)
     - product_id : foriegn key (bigint)
     - rate : integer
     - review : integer
     - created_at : timestamp


  # cart table  ,, its many to many table between products and users with extra info
     - id : serial primary key (bigint)
     - user_id : foriegn key (bigint)
     - product_id : foriegn key (bigint)
     - quantity : integer
     - total : integer
     - created_at : timestamp


    # wishlist table  ,, its many to many table between products and users
     - id : primary key (bigint)
     - user_id : foriegn key (bigint)
     - product_id : foriegn key (bigint)


  # orders table
     - id : primary key (bigint)
     - user_id : foriegn (bigint)
     - oreder_number : varchar(255)
     - products : text
     - address : text
     - sub_toal : float
     - vat : float default(0)
     - total : float
     - payment_method : varchar(100)
     - status :  varchar(100)
     - created_at : timestamp

  # faqs table // questions and answers about the app
     - id : primary key (bigint)
     - question : varchar(255)
     - answer : text
     - created_at : timestamp

  # app_info table // information about the app like logo email address and social media
     - id : primary key (bigint)
     - key : varchar(255)
     - value : text

 # contact_messages table  // its for contact us form
     - id : primary key (bigint)
     - name : varchar(255)
     - email : varchar(255)
     - subject : varchar(255)
     - message : text
     - created_at : timestamp



##################### DATABASE ROUTES #########################
   

   - its a postman collection 
    https://www.getpostman.com/collections/4af28eafaac6678013a1
