CREATE TABLE users (
  id integer PRIMARY KEY,
  email varchar(100) UNIQUE,
  password varchar(200)
);
