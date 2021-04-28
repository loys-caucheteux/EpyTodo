const db = require('../config/db')
const utils = require('../utils')

const email_exists = module.exports.email_exists = function (req, res, next) {
    try {
        var sql = `SELECT * FROM user WHERE email="${req.params.unique}"`
    } catch (e) {
        db.sql_err(res);
    }
    db.con.query(sql, function (err, quered) {
        if (err) db.sql_err(res);
        if (quered.length > 0) next()
        else {
            res.type('application/json')
            res.status(404)
            res.send(JSON.stringify({msg: "Not Found"}, null, 2))
        }
    });
}

const id_exists = module.exports.id_exists = function (req, res, next) {
    if (req.params.unique.match(/^[0-9]+$/i) != null) {
        try {
            var sql = `SELECT * FROM user WHERE id=${req.params.unique}`
        } catch (e) {
            db.sql_err(res);
        }
        db.con.query(sql, function (err, quered) {
            if (err) db.sql_err(res);
            if (quered.length <= 0) next()
            else {
                res.type('application/json')
                quered[0].created_at = utils.correctDate(JSON.stringify(quered[0].created_at))
                res.send(JSON.stringify(quered[0], null, 2))
            }
        });
    }
    else next()
}

const id_standalone = module.exports.id_standalone = function (req, res, next) {
    try {
        if (req.params.id.match(/^[0-9]+$/i) != null)
            var sql = `SELECT * FROM user WHERE id=${req.params.id}`
        else db.sql_err(res);
    } catch (e) {
        db.sql_err(res);
    }
    db.con.query(sql, function (err, quered) {
        if (err) db.sql_err(res);
        if (quered.length > 0) next()
        else {
            res.type('application/json')
            res.status(404)
            res.send(JSON.stringify({msg: "Not Found"}, null, 2))
        }
    });
}

const form_user_query = module.exports.form_user_query = function(req, res, next) {
    if (req.body.email == undefined || req.body.password == undefined || req.body.name == undefined || req.body.firstname == undefined  || req.body.created_at == undefined)
        db.sql_err(res);
    else next();

}

const check_putinfo = module.exports.check_putinfo = function(req, res, next) {
    var sql = `SELECT * FROM user WHERE id=${req.params.id}`
    db.con.query(sql, function (err, quered) {
        if (err) db.sql_err(res);
        var row = quered[0];
        if (row.password != req.body.password
            || req.body.created_at != utils.correctDate(JSON.stringify(row.created_at))
            || row.firstname != req.body.firstname || row.name != req.body.name)
                db.sql_err(res);
        else next();
    });   
}

const updateUserInfo = module.exports.updateUserInfo = function (req, res, next) {
    var sql = `UPDATE user SET email = '${req.body.email}' WHERE id=${req.params.id}`
    db.con.query(sql, function (err, result) {
        if (err) db.sql_err(res);
    });
    next()
}