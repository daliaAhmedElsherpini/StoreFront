/* Replace with your SQL commands */
CREATE TABLE faqs (
    id SERIAL PRIMARY KEY ,
    question VARCHAR(255),
    answer text,
    created_at TIMESTAMP
)