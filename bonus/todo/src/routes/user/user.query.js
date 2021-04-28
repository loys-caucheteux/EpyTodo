const authMiddle = require('../../middleware/auth')
const userMiddle = require('../../middleware/user')
const db = require('../../config/db')

const init_user_query = module.exports.init_user_query = function (app) {
    app.put('/user/:id',
        authMiddle.tokenCheck,
        userMiddle.id_standalone,
        userMiddle.form_user_query,
        userMiddle.check_putinfo,
        userMiddle.updateUserInfo, (req, res) => {
        var sql = `SELECT * FROM user WHERE id=${req.params.id}`
        db.con.query(sql, function (err, rows) {
            if (err) db.sql_err(res);
            var resJson = rows[0];
            resJson.email = req.body.email
            resJson.created_at = req.body.created_at
            res.set('token', req.header('token'))
            res.type('application/json')
            res.send(JSON.stringify(resJson, null, 4));
        })
    })
    app.delete('/user/:id', authMiddle.tokenCheck, userMiddle.id_standalone, (req, res) => {
        var sql = `DELETE FROM user WHERE id=${req.params.id}`
        db.con.query(sql, function (err, rows) {
            if (err) db.sql_err(res);
        })
        res.set('token', req.header('token'))
        res.type('application/json')
        res.send(JSON.stringify({msg: `successfully deleted record number: ${req.params.id}`}, null, 4));
    })
}