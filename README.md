# Library-Management-System

    This is a Library Management API backend for the management od users and the books in the library.

# Routes and the Endpoints

## /users
GET: Get all the list of users
POST: Create a new user

## /users/:id
GET: Get a user by id
PUT: Update a user by id
DELETE: Delete a user by id(check if the user still has an issued book && is there any fine/penelty to be collected)

## /users/subscription-details/:id
GET: Get the subscription details of a user by id
    >> Date of subscription
    >> Valid till ?
    >> Fine if any ?

## /books
GET: Get all the list of books
POST: Create a new book

## /books/:id
GET: Get a book by id
PUT: Update a book by id
DELETE: Delete a book by id

## /books/issued
GET: Get all the list of books that are issued

## /books/issued/withFine
GET: Get all the list of books that are issued with fine

### Subscription Types
  >> Basic (3 months)
  >> Standard (6 months)
  >> Premium (1 year)

>> If the user missed the renual date, then user should be collected with 100 rupees
>> If the user misses his subscription, then user is expected to pay 100 rupees
>> If the user misses both the subscription and the renual date, then user is expected to pay 200 rupees

# Commands:
npm init
npm i express
npm i nodemon --save-dev
 
npm run dev --> to run the application

To restore node Modules and package-lock.json file
npm install

