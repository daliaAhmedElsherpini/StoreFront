/* Replace with your SQL commands */
CREATE TABLE products (
    id SERIAL PRIMARY KEY ,
    title VARCHAR(255) ,
    image VARCHAR(255) DEFAULT('default.png'),
    stock integer ,
    description text , 
    price integer,
    sale_price integer null,
    category_id bigint ,
    FOREIGN KEY (category_id) REFERENCES categories(id) ,
    created_at TIMESTAMP
)
