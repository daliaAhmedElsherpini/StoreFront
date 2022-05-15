/* Replace with your SQL commands */
CREATE TABLE cart (
    id SERIAL PRIMARY KEY ,
    quantity integer,
    user_id bigint,
    product_id bigint,
    total integer,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    created_at TIMESTAMP
)