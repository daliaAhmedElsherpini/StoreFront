/* Replace with your SQL commands */
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY ,
    rate integer ,
    review VARCHAR(255),
    user_id bigint,
    product_id bigint,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    created_at TIMESTAMP
)