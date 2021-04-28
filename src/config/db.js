require('dotenv').config()
const mysql = require('mysql2')

const con = module.exports.con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to db");
  });

const sql_err = module.exports.sql_err = function(res) {
  res.type('application/json')
  res.status(500)
  res.send(JSON.stringify({msg: "internal server error"}, null, 2))
}