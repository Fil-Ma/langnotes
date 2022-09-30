CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(200),
  google JSON,
  facebook JSON
);

CREATE TABLE vocabularies (
  id UUID PRIMARY KEY,
  language VARCHAR(50)
);

CREATE TABLE terms (
  id UUID PRIMARY KEY,
  vocabulary_id UUID REFERENCES vocabularies(id) UNIQUE
);

CREATE TABLE notebooks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  vocabulary_id UUID REFERENCES vocabularies(id) UNIQUE,
  name VARCHAR(50),
  language VARCHAR(50),
  description VARCHAR(200)
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY,
  notebook_id UUID REFERENCES notebooks(id),
  content VARCHAR(200),
  title VARCHAR(50) ,
  description VARCHAR(100)
);
