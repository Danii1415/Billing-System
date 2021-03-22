How To Run

This order is important

1. create a new postgres db and fill in 'user,password,database' in server/ormconfig

2. cd server -> npm i -> npm start         (Orm creates required tables at db)

3. cd server -> npm run typeorm migration:run      (init db with json data)

4. cd client -> npm i -> npm start

To Do

-authentication between client and server

-search user input when creating new transactions on client

-get transactions data in batch or limit size (and then create a load more button to load transactions data with offset) since transactions data can be a cery large table with a lot of data

-add .env files for urls/settings in both client and user

-search query should be in the server and not in the client. Use debounce.

-add more form validations(phone number, credit card etc.)

-add automatic migration for creating the database on first app run

-add redux for state management

-responsive UI

-refactor some types from 'any' to real type
