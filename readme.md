# Start project;

1. In terminal run "npm i"
2. Create in postgres you db;
3. Past in psql terminal for create users table:
   <pre>
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
   </pre>

   Wait string CREATE TABLE

4. Past in psql terminal for create profile table:

   <pre>
   CREATE TYPE state_types AS ENUM ('Male', 'Female', 'Other');
   create TABLE profile (
   id Serial PRIMARY KEY,
   firstname VARCHAR(255),
   lastname VARCHAR(255),
   state state_types
   );
   </pre>

   Wait string CREATE TABLE

5. In terminal project past "npm start dev" for start developer mode.

# Use project

For use project you can use "Postman" last version.

Example request:

- all users GET "http://localhost:8080/api" no body.
- all users by role GET "http://localhost:8080/api/:role" no body.
- update any property PUT "http://localhost:8080/api/:id" body:
    <pre>
        {
  "users": {}
  "profile":{}
  }
  </pre>
- create user POST "http://localhost:8080/api" body:
<pre>
  {
  "username": "Example username",
  "email": "Example email",
  "firstname": "Example firstname",
  "lastname": "Example lastname",
  "state": "Admin or User",
  "role": "Male or Female or Other"
  }
</pre>
