const authMiddle = require('../../middleware/auth')
const todoMiddle = require('../../middleware/todos')
const db = require('../../config/db')

const init_todos_query = module.exports.init_todos_query = function (app) {
    app.put('/todo/:id', authMiddle.tokenCheck, todoMiddle.id_standalone, todoMiddle.form_todo, todoMiddle.update_todo, function (req, res) {
        res.set('token', req.header('token'))
        res.type('application/json')
        res.send(JSON.stringify({...req.body}, null, 4))
    })
    app.delete('/todo/:id', authMiddle.tokenCheck, todoMiddle.id_standalone, function (req, res) {
        var sql = `DELETE FROM todo WHERE id=${req.params.id}`
        db.con.query(sql, function (err, result) {
            if (err) {db.sql_err(res)}
        })
        res.set('token', req.header('token'))
        res.type('application/json')
        res.send(JSON.stringify({msg: `successfully deleted record number: ${req.params.id}`}, null, 4));
    })
}
