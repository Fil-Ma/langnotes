CREATE TABLE users (
  id integer PRIMARY_KEY,
  email varchar(100) UNIQUE,
  password varchar(200)
);
