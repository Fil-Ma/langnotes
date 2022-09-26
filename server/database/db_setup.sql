CREATE TABLE users (
  id uuid PRIMARY KEY,
  email varchar(100) UNIQUE,
  password varchar(200),
  google JSON,
  facebook JSON
);
