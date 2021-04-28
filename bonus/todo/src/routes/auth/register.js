const regisMiddle = require('../../middleware/register')
const jwt = require('jsonwebtoken')

const init_regis = module.exports.init_regis = function (app) {
    app.post('/register', regisMiddle.form_register, regisMiddle.not_exist, regisMiddle.registerMiddleware, (req, res) => {
        var token = jwt.sign(req.body.email, process.env.SECRET)
        console.log("request POST on /register");
        res.type('application/json')
        res.set('token', token)
        res.send(JSON.stringify({token: token}, null, 2));
    })
}