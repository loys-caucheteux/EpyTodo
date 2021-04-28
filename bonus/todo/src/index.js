require('dotenv').config()

const express = require('express')
const db = require('./config/db')
const bparser = require('body-parser')
const app = express()
const cors = require('cors')

const port = process.env.PORT

const register = require('./routes/auth/register')
const auth = require('./routes/auth/auth')
const user = require('./routes/user/user')
const user_query = require('./routes/user/user.query')
const todo = require('./routes/todos/todos')
const todo_query = require('./routes/todos/todos.query')
app.use(bparser.json());
app.use(cors());
register.init_regis(app)
auth.init_login(app)
user.init_user(app)
user_query.init_user_query(app)
todo.init_todos(app)
todo_query.init_todos_query(app)

app.listen(port, () => {
    console.log(`app listening at http://${process.env.HOST}:${process.env.PORT}`);
  })