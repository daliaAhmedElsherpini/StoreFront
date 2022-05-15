/* Replace with your SQL commands */
/* Replace with your SQL commands */
CREATE TABLE user_addresses (
    id SERIAL PRIMARY KEY ,
    user_id bigint,
    FOREIGN KEY (user_id) REFERENCES users(id),
    country VARCHAR(255),
    city VARCHAR(255),
    street VARCHAR(255),
    flat_number VARCHAR(255),
    address VARCHAR(255),
    phone_number VARCHAR(255),
    email VARCHAR(255)
)