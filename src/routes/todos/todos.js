const authMiddle = require('../../middleware/auth')
const todoMiddle = require('../../middleware/todos')
const db = require('../../config/db')
const utils = require('../../utils')

const init_todos = module.exports.init_todos = function (app) {
    app.get('/todo', authMiddle.tokenCheck, function (req, res) {
        db.con.query('SELECT * FROM todo', function (err, rows) {
            if (err) db.sql_err(res);
            if (rows.lenght === 0) {
                res.set('token', req.header('token'))
                res.type('application/json')
                res.send(JSON.stringify({msg: "Not Found"}, null, 4));
            }
            else {
                Object.keys(rows).forEach(function (key) {
                    rows[key].created_at = utils.correctDate(JSON.stringify(rows[key].created_at))
                    rows[key].due_time = utils.correctDate(JSON.stringify(rows[key].due_time))
                })
                res.set('token', req.header('token'))
                res.type('application/json')
                res.send(JSON.stringify(rows, null, 4));
            }
        })
    })
    app.get('/todo/:id', authMiddle.tokenCheck, todoMiddle.id_standalone, function(req, res) {
        var sql = `SELECT * FROM todo WHERE id=${req.params.id}`
        db.con.query(sql, function (err, result) {
            if (err) db.sql_err(res);
            result[0].created_at = utils.correctDate(JSON.stringify(result[0].created_at))
            result[0].due_time = utils.correctDate(JSON.stringify(result[0].due_time))
            res.set('token', req.header('token'))
            res.type('application/json')
            res.send(JSON.stringify(result[0], null, 4));
        });
    })
    app.post('/todo', authMiddle.tokenCheck,  todoMiddle.form_todo, function (req, res) {
        var sql = `INSERT INTO todo (title, description, due_time, status, user_id)
        VALUES ('${req.body.title}', '${req.body.description}', CAST('${req.body.due_time}' AS DATETIME), '${req.body.status}', ${req.body.user_id})`
        db.con.query(sql, function(err, result) {
            if (err) db.sql_err(res)
        })
        db.con.query('SELECT LAST_INSERT_ID() AS last_id', function(err, result) {
            if (err) db.sql_err(res)
            db.con.query(`SELECT * FROM todo WHERE id=${result[0].last_id}`, function (err, rows) {
                if (err) db.sql_err(res)
                rows[0].created_at = utils.correctDate(JSON.stringify(rows[0].created_at))
                rows[0].due_time = utils.correctDate(JSON.stringify(rows[0].due_time))
                res.set('token', req.header('token'))
                res.type('application/json')
                res.send(JSON.stringify(rows[0], null, 4))
            })
        })
    })
}