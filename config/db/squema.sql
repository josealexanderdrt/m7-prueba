CREATE DATABASE nanacao;

CREATE TABLE cafes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE
);

INSERT INTO cafes (nombre)
VALUES
    ('Cortado'),
    ('Americano'),
    ('Mocacino'),
    ('Cappuccino');