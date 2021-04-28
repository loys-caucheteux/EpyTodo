const db = require('../config/db')
const crypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const form_login = module.exports.form_login = function (req, res, next) {
    if (req.body.email == undefined || req.body.password == undefined)
        db.sql_err(res)
    else next()
}

const credentialsCheck = module.exports.credentialsCheck = function (req, res, next) {
    try {
        var sql = `SELECT * FROM user WHERE email="${req.body.email}"`
    } catch (e) {
        db.sql_err(res);
    }
    db.con.query(sql, function (err, quered) {
        if (err) db.sql_err(res);
        if (quered.length > 0) {
            var user = quered[0];
            crypt.compare(req.body.password, user.password).then(function(result) {
                if (result) next()
                else {
                    res.type('application/json')
                    res.send(JSON.stringify({msg: "Invalid Credentials"}, null, 2))
                }
            })
        }
        else {
            res.type('application/json')
            res.send(JSON.stringify({msg: "Invalid Credentials"}, null, 2))
        }
    });
}

const tokenCheck = module.exports.tokenCheck = function (req, res, next) {
    if (req.header('token') != undefined) {
        var token = req.header('token')
        try {
            var dcode = jwt.verify(token, process.env.SECRET);
        } 
        catch(err) {
            res.type('application/json')
            res.send(JSON.stringify({msg: "Token is not valid"}, null, 2))
        }
        if (dcode != undefined) next()
    }
    else {
        res.type('application/json')
        res.send(JSON.stringify({msg: "No token, authorization denied"}, null, 2))
    }
}