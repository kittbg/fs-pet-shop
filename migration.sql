DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id serial PRIMARY KEY,
    name varchar(20),
    age integer,
    kind varchar(20)
);