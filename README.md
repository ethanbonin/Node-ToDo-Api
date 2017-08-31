# Todo API



#### Explaination of the API
I recently was just practicing with Node.js by creating a working Todo  REST API with working **_ENDPOINTS_**.
I practice with every single HTTP Methods.

## IMPORTANT BEFORE STARTING

Before you start, you need to make a **_config.json_** that will live in the **_config folder_**.

- The **config.json** file.
```
{
  "test": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/TodoAppTest",
    "JWT_SECRET": "abc123"
  },
  "development": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/TodoApp",
    "JWT_SECRET": "abc123"
  }
}
```

You need a testing database and a development database. 


- **JWT_SECRET**
If you decide to post it to your own heroku server, make sure to connect a JWT_SECRET environment variable
You need to make sure to set a random string variable connected to an _environmental variable_. 

__DONT USE THIS, BUT THIS IS AN EXAMPLE__

``` heroku config:set JWT_SECRET=lkasdfljdasl ```

After you add these two things ```{JWT_SECRET, config.json}```, then you'll have everything set up.


## ENDPOINTS
Quick Note, BEFORE you can anything, you have to create (sign up) a user. So I will start with User Endpoints
--------------------------------
- # POST
```POST /users/```
Example:
The body must contain a correctly formatted Email and a password that must be 6 characters in length

```
{
	"email":"ethan@example.com",
	"password": "abc123"
}
```

It will return a response with: 

```
{
    "_id": "59a8300fcc135c001163057c",
    "email": "etha2n@example.com"
}
```
and a header token value __that you need to do anything___
```
x-auth : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWE4MzAwZmNjMTM1YzAwMTE2MzA1N2MiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTA0MTk0NTc1fQ.WI026-Z7itt6bGhxTOPnAF7bMNOMTo9QqCfHuLsWQuM

```
