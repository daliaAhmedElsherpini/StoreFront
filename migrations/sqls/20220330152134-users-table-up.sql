/* Replace with your SQL commands */

CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    name VARCHAR(255) ,
    email VARCHAR(255) UNIQUE ,
    phone VARCHAR(255) UNIQUE ,
    password VARCHAR(255) ,
    status BOOLEAN	DEFAULT('1'),
    country_id bigint,
    city_id bigint,
    FOREIGN KEY (country_id) REFERENCES countries(id),
    FOREIGN KEY (city_id) REFERENCES cities(id),
    created_at TIMESTAMP
)