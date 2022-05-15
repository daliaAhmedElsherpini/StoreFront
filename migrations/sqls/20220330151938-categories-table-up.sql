/* Replace with your SQL commands */
CREATE TABLE categories (
    id SERIAL PRIMARY KEY ,
    name VARCHAR(100) ,
    image VARCHAR(255),
    description VARCHAR(255) ,
    created_at TIMESTAMP
)