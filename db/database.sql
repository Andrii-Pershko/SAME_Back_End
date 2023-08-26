CREATE TYPE userRoles AS ENUM ('Admin', 'User');
ALTER TABLE users ADD FOREIGN KEY (profileId) REFERENCES profiles(id);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    role userRoles,
    dataCreate TIMESTAMP,
    profileid INT
);

CREATE TYPE state_types AS ENUM ('Male', 'Female', 'Other');

create TABLE profile (
    id Serial PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    state state_types
);       