const db = require('../config/db')

const form_todo = module.exports.form_todo = function (req, res, next) {
    if (req.body.title == undefined || req.body.description == undefined || req.body.due_time == undefined
        || req.body.user_id == undefined || req.body.status == undefined)
        db.sql_err(res)
    else {
        if (req.body.user_id.match(/^[0-9]+$/i) != null && 
        (req.body.status == 'not started' || req.body.status == 'done' || req.body.status == 'todo' || req.body.status == 'in progress'))
            next()
        else  {db.sql_err(res);}
    }
}

const id_standalone = module.exports.id_standalone = function (req, res, next) {
    try {
        if (req.params.id.match(/^[0-9]+$/i) != null)
            var sql = `SELECT * FROM todo WHERE id=${req.params.id}`
        else db.sql_err(res)
    } catch (e) {
    db.sql_err(res);}
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

const update_todo = module.exports.update_todo = function (req, res, next) {
    var sql = `UPDATE todo SET title = '${req.body.title}',
                    description = '${req.body.description}',
                    due_time = CAST ('${req.body.due_time}' AS DATETIME),
                    status = '${req.body.status}',
                    user_id = ${req.body.user_id} WHERE id=${req.params.id}`
        db.con.query(sql, function (err) {
            if (err) {console.log(err); db.sql_err(res);}
        })
        next()
}