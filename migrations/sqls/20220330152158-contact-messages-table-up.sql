/* Replace with your SQL commands */

CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY ,
    name VARCHAR(255) ,
    email VARCHAR(255) ,
    subject VARCHAR(255) ,
    message text ,
    created_at TIMESTAMP
)