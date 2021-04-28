const db = require('../config/db')
const crypt = require('bcryptjs')

const form_register = module.exports.form_register = function (req, res, next) {
    if (req.body.email == undefined || req.body.password == undefined
        || req.body.name == undefined || req.body.firstname == undefined) {
            res.type('application/json')
            res.send(JSON.stringify({msg : "internal server error"}, null, 2))
        }
    else next()
}

const not_exist = module.exports.not_exist = function (req, res, next) {
    try {
        var sql = `SELECT * FROM user WHERE email='${req.body.email}'`
    } catch (e) {
        db.sql_err(res);
    }
    db.con.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.type('application/json')
            res.send(JSON.stringify({msg : "account already exists"}, null, 2))
        } else next()
    });
}

const registerMiddleware = module.exports.registerMiddleware = function (req, res, next) {
    try {
        crypt.hash(req.body.password, 10).then(function(hash) {
            var sql = `INSERT INTO user (email, password, name, firstname)
                    VALUES ('${req.body.email}', '${hash}', '${req.body.name}', '${req.body.firstname}')`
            db.con.query(sql, function (err, result) {
                if (err) db.sql_err(res);
            });
        });
    }
    catch (err) {
        db.sql_err(res);
    }
    next()
}