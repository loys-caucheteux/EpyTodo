const authMiddle = require('../../middleware/auth')
const userMiddle = require('../../middleware/user')
const jwt = require('jsonwebtoken')
const db = require('../../config/db')
const utils = require('../../utils')

const init_user = module.exports.init_user = function (app) {
    app.get('/user', authMiddle.tokenCheck, (req, res) => {
        var sql = `SELECT * FROM user WHERE email='${jwt.verify(req.header('token'), process.env.SECRET)}'`
        db.con.query(sql, function (err, result) {
            if (err) db.sql_err(res);
            res.set('token', req.header('token'))
            res.type('application/json')
            result[0].created_at = utils.correctDate(JSON.stringify(result[0].created_at))
            res.send(JSON.stringify(result[0], null, 4));
        });
    })
    app.get('/user/todos', authMiddle.tokenCheck, (req, res) => {
        var sql = `SELECT * FROM user WHERE email='${jwt.verify(req.header('token'), process.env.SECRET)}'`
        db.con.query(sql, function (err, result) {
            if (err) db.sql_err(res);
            sql = `SELECT * FROM todo WHERE user_id=${result[0].id}`
            db.con.query(sql, function (err, todos) {
                if (err) db.sql_err(res);
                if (todos[0] != undefined) {
                    res.set('token', req.header('token'))
                    res.type('application/json')
                    todos.forEach(element => {
                        element.created_at = utils.correctDate(JSON.stringify(element.created_at))
                        element.due_time = utils.correctDate(JSON.stringify(element.due_time))
                    });
                    res.send(JSON.stringify(todos, null, 4));
                }
                else {
                    res.set('token', req.header('token'))
                    res.type('application/json')
                    res.status(404)
                    res.send(JSON.stringify({msg: "No todos found for this user."}))
                }
            });
        });
    })
    app.get('/user/:unique', authMiddle.tokenCheck, userMiddle.id_exists, userMiddle.email_exists, (req, res) => {
        var sql = `SELECT * FROM user WHERE email='${req.params.unique}'`
        db.con.query(sql, function (err, result) {
            if (err) db.sql_err(res);
            res.set('token', req.header('token'))
            res.type('application/json')
            result[0].created_at = utils.correctDate(JSON.stringify(result[0].created_at))
            res.send(JSON.stringify(result[0], null, 4));
        });
    })
}