/* Replace with your SQL commands */
CREATE TABLE cities (
    id SERIAL PRIMARY KEY ,
    name VARCHAR(100) ,
    country_id bigint,
    FOREIGN KEY (country_id) REFERENCES countries(id),
    created_at TIMESTAMP
)