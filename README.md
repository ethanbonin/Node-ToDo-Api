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

After you add these two things ```{JWT_SECRET, config.json}```, You only have one thing left to do.


- **Set up MONGO database locally**

```mkdir ~/Documents/MongoData && mongod --dbpath ~/Documents/MongoData```

Once you have the localdatabase up and running, you're able to start playing with the API locally!


## ENDPOINTS
Quick Note, BEFORE you can anything, you have to create (sign up) a user. So I will start with User Endpoints
--------------------------------
### POST
- [/user/](https://github.com/ethanbonin/Node-ToDo-Api/wiki/POST------%5Cuser-%5C) <-- start with this one first before anything.
- [/user/login/](https://github.com/ethanbonin/Node-ToDo-Api/wiki/POST-user-login)
- [/todos](https://github.com/ethanbonin/Node-ToDo-Api/wiki/POST-todos)
--------------------------------
### GET
- [/user/me](https://github.com/ethanbonin/Node-ToDo-Api/wiki/GET-user--me)
- [/todos/](https://github.com/ethanbonin/Node-ToDo-Api/wiki/GET-todos)
- [/todos/:id](https://github.com/ethanbonin/Node-ToDo-Api/wiki/GET--todos-:id)
--------------------------------
### PATCH
- [/user/me](https://github.com/ethanbonin/Node-ToDo-Api/wiki/PATCH--todos-:id)
--------------------------------
### DELETE
- [/user/me](https://github.com/ethanbonin/Node-ToDo-Api/wiki/DELETE--todos-:id)
- [/todos/](https://github.com/ethanbonin/Node-ToDo-Api/wiki/DELTE--users-me-token)
