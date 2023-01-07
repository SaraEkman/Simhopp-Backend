require('dotenv').config();

function checkAdmin(req, res, next) {
    if (req.locals.admin == process.env.USER) {
        res.sendStatus(401);
    }
    else next();
}

module.exports = { checkAdmin: checkAdmin };