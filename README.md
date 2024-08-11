# UserService Test Coverage

This is report on all the test cases covered for the `UserService` module in this project. 
The `UserService` contains functions for operations, such as creating, updating, and retrieving users from the database using Prisma.

## UserService Overview

The `UserService` provides the following methods:

- **createUser**: Creates a new user in the database.
- **updateUser**: Updates an existing user's information.
- **getUser**: Retrieves a user by their ID.
- **getUsers**: Retrieves all users from the database.

## Test Coverage

The test suite for `UserService` aims to ensure that all functionalities work as expected and handle errors gracefully. Below is a detailed breakdown of the areas covered by the tests:

### 1. `createUser`

- **Successful Creation**: Verifies that a user can be successfully created with valid data.
- **Duplicate Email Error**: Checks that an error is thrown when attempting to create a user with an email that already exists.

### 2. `updateUser`

- **Successful Update**: Ensures that a user's details can be updated correctly.
- **Database Unreachable Error**: Tests error handling when the database is unreachable during the update operation.

### 3. `getUser`

- **Successful Retrieval**: Confirms that a user can be retrieved by their ID.
- **Database Unreachable Error**: Tests error handling when the database is unreachable during the retrieval operation.

### 4. `getUsers`

- **Successful Retrieval**: Verifies that a list of all users can be retrieved.
- **Database Unreachable Error**: Tests error handling when the database is unreachable during the retrieval of users.

### 5. Jest Features

- **Method Spying**: Demonstrates the use of Jest spies to monitor method calls on the `PrismaService` during tests, specifically focusing on the `create` method.


## Running the Tests

To execute the test suite, run the following command in your terminal:

```bash
npm test
