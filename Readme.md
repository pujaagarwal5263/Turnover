# How to start guide?

1. Create your env with the following data:

```
PORT=8000
DB_CONNECTION="postgresql:randomdetails"
```

2. Install dependencies:

```
npm install
```

3. Start the code:

```
npm start
```

# Endpoints Documentation

This documentation provides information about the payload structure required for each endpoint.

## 1. POST: /insert

**Description:**
Hit this endpoint to insert 100 categories with Faker.js.

**Response Structure:**

```json
{
  "message": "Categories inserted successfully."
}
```

## 2. POST: /signup

**Description:**
To create a new user.

**Request Payload:**

```json
{
  "username": "puja",
  "email": "puja11@gmail.com",
  "password": "12324"
}
```

**Response Structure:**

```json
{
  "message": "User created successfully",
  "user": {
    "id": 4,
    "username": "puja",
    "email": "puja12@gmail.com"
  }
}
```

## 3. POST: /login

**Description:**
To login an existing user.

**Request Payload:**

```json
{
  "email": "puja12@gmail.com",
  "password": "12324"
}
```

**Response Structure:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcxMTQ3NTYwNCwiZXhwIjoxNzExNDk3MjA0fQ.gdhrZZ11iR1eZxHXuHF3biWfz2VIsp1hB5pVchi1kl0",
  "userId": 4
}
```

## 4. GET: /get-categories

**Description:**
To get all categories with pagination

**URL structure:**

```
get-categories?page=5&limit=10
```

**Response Structure:**

```json
{
  "categories": [
    {
      "id": 1,
      "name": "Kids",
      "userId": null
    },
    {
      "id": 2,
      "name": "Toys",
      "userId": null
    },
    {
      "id": 3,
      "name": "Shoes",
      "userId": null
    },
    {
      "id": 4,
      "name": "Movies",
      "userId": null
    },
    {
      "id": 5,
      "name": "Garden",
      "userId": null
    },
    {
      "id": 6,
      "name": "Games",
      "userId": null
    }
  ],
  "totalPages": 17,
  "currentPage": 1,
  "totalCategories": 100
}
```

## 5. GET: /get-categories

**Description:**
To get all categories of given user

**URL structure:**

```
/user-categories/:userId
```

**Response Structure:**

```json
{
  "userId": "4",
  "selectedCategories": [
    {
      "id": 13,
      "name": "Music"
    },
    {
      "id": 20,
      "name": "Clothing"
    }
  ]
}
```
