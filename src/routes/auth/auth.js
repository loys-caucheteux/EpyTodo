const authMiddle = require('../../middleware/auth')
const jwt = require('jsonwebtoken')

const init_login = module.exports.init_login = function (app) {
    app.post('/login', authMiddle.form_login, authMiddle.credentialsCheck, (req, res) => {
        var token = jwt.sign(req.body.email, process.env.SECRET)
        res.type('application/json')
        res.set('token', token)
        res.send(JSON.stringify({token: token}, null, 2));
    })
}
