/* Replace with your SQL commands */

CREATE TABLE wishlist (
    id SERIAL PRIMARY KEY ,
    user_id bigint,
    product_id bigint,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
)