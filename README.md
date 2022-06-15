# Merchant Service
This project is written in Node.js, using Express Js Framework and MySQL as database

# Installation
You need to install:
1. npm install express
2. npm install --save sequelize mysql2
3. npm install --save-dev sequelize sequelize-cli
4. npm install bcrypt
5. npm install jsonwebtoken
6. npm install validatorjs

# How to run the app
Run `node app.js` On your terminal in the root directory
The server using port: 3000 and you can access on http://localhost:3000. You can change your port in ./app.js

# Rest API
This project using two entities, merchant and product

![alt text](ERD-Merchant_service.png)

A merchant needs username and password for login. A Merchant has username, password, address, and join_date, and phone_number. A product has name, quantity, and price. A merchant has several product and can has no product. Every product has only one merchant.

### This is Diagram Architecture of Merchant Service

![alt text](Diagram%20Architecture%20Merchant-Service.png)

1. Merchant
   
   **-SignUp Merchant**

    `POST`  `/signup`

    Parameters: body

    - password string, min:6 *required
    - username string, min:3, max:50 *required
    - address string *required
    - join_date string *required
    - phone_number integer *required

    Response: JSON

    - `status: 200` registration successfull
    
    ```
    {

    "message": "Merchant has been registered."

    }
    ```
    - `status: 400` registration failed

    ```
    {
        "message": "Error on: ",
        "data": {
        "phone_number": [
            "The phone number must be a number."
            ]
            }
    }
    ```

   **-Login Merchant**

   `POST` `/login`

   Parameter: body

   - password string, min:6 *required
   - username string, min:3, max:50 *required

   Response: JSON

   - `status: 200`

    ```
    {
        "message": "Login Success",
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJjb2JhIiwiaWF0IjoxNjU1MjgzMTE5LCJleHAiOjE2NTU4ODc5MTl9.e1D3oYxjXk4Re2ags2pgUszAllQOCKoPdsKSwvWYINg"
        }
    }
    ```

   - `status: 204, 400, 404` 

    ```
    {
        "message": "Username or password is invalid"
    }
    ```

   **-DeleteAccount Merchant**

   `DEL` `/deleteacc/:id`

   Response: JSON

   - `status: 200`

    ```
    {
        "message": "Merchant has been deleted."
    }
    ```

   - `status: 400`

    ```
    "Delete Account Failed"
    ```

    
2. Product
   
   **-Insert Product**

   `POST` `/product`

   Parameters: body

   - name *required, min: 3, max: 50    
   - quantity *required, min:1, numeric
   - Price *required, min: 10000, numeric

   Response: JSON

   - `status: 200`
  
   ```
   {
        "message": "Product has been inserted",
        "data": {
            "name": "dress exclusive",
            "quantity": 10,
            "price": 350000
        }   
    }
    ```    

   - `status: 400`

   (validation failed, Insert Product Failed, example: price field)

   ```   
   {
        "message": "Error on: ",
        "data": {
            "price": [
                "The price field is required."
            ]
        }
    }
    ```

   **-List Products**

   `GET` `/product`

    Response: JSON

   - `status: 200`

    ```
    {
    "message": "Product is found",
        "data": [
        {
            "id": 1,
            "name": "Dress Wanita",
            "quantity": 250,
            "price": 400000,
            "createdAt": "2022-06-14T20:52:32.000Z",
            "updatedAt": "2022-06-14T20:59:43.000Z"
        },
        {
            "id": 2,
            "name": "daily hijab",
            "quantity": 150,
            "price": 100000,
            "createdAt": "2022-06-14T20:54:37.000Z",
            "updatedAt": "2022-06-14T20:54:37.000Z"
        },
        {
            "id": 4,
            "name": "dress exclusive",
            "quantity": 10,
            "price": null,
            "createdAt": "2022-06-15T14:33:35.000Z",
            "updatedAt": "2022-06-15T14:33:35.000Z"
        }
        ]
    }
    ```

   **-Update Product**

   `PUT` `/product/:id`

   Parameter :body

   - id

   Response JSON
   
   `Status: 200`

   Product has been updated

   ```
   {
        "message": "Product has been updated",
        "data": {
            "name": "Dress Wanita",
            "quantity": 250,
            "price": 400000
        }
    }   
   ```

   `Status: 400`

   Update Product Failed

   ```
   {
    "message": "Error on: ",
        "data": {
            "name": [
                "The name field is required."
            ],
            "quantity": [
                "The quantity field is required."
            ],
            "price": [
                "The price field is required."
            ]
        }   
    }      
   ```

   **-Delete Product**

   `DEL` `/product/:id`

   Parameter: body

   - id

   Response: JSON

   - `Status: 200` 
  
  ```
  {
    "message": "Product has been deleted"
  }
  ```
   
   - `Status: 400`

  ```
  {
    "message": "Delete product failed"
  }
  ```

  **-Authenticate User**

  - Authorization: Bearer Token
  - `token` token from login response *required


  Response: JSON 

  - `Status: 200`

  ```
  {
    "message": "Data is found",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ1c2VyMiIsImlhdCI6MTY1NTMwODQ3OSwiZXhwIjoxNjU1OTEzMjc5fQ.80eruIyEaiz2rboRZaHYNHxIVU5vJD655vPo1MLcME0"
    }
  }
  ```

  - `Status: 401` Unauthorized, invalid token

  ```
  {
    "message": "Invalid Token"
  }   
  ```
 - `Status: 401` Unauthorized, if token is not used

 ```
 {
    "message": "Unauthorized"
 }   
 ```





