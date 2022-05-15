/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY ,
    order_number VARCHAR(255) ,
    products text,
    address text,
    sub_total float,
    vat float DEFAULT(0),
    total float,
    payment_method VARCHAR(255) ,
    user_id bigint,
    status VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id) ,
    created_at TIMESTAMP
)