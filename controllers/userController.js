const models = require('../models');
const jwt = require('../utils/jwt');
const config = require('../config/config');

module.exports = {
    getRegister: function (req, res, next) {
        res.render('./users/register.hbs');
    },

    postRegister: function (req, res, next) {
        const { username, password, repeatPassword, amount } = req.body;

        models.User.create({ username, password, amount }).then((registeredUser) => {

            res
                .redirect('/');
        })
    },

    getLogin: function (req, res, next) {
        res.render('./users/login.hbs');
    },

    postLogin: function (req, res, next) {
        const { username, password } = req.body;

        models.User.findOne({ username }).then((user) => {
            Promise.all([user, user.matchPassword(password)])
                .then(([user, match]) => {
                    if (!match) {
                        console.log('Password is invalid');
                        return
                    }

                    const token = jwt.createToken({ id: user._id });
                    const userDetails = {
                        username: username,
                        amount: user.amount,
                        id: user.id
                    }

                    res
                        .cookie(config.cookie, token)
                        .cookie(config.userDetails, userDetails)
                        .redirect('/');
                })
        })
    },

    getLogout: function (req, res, next) {
        res.clearCookie(config.cookie).redirect('/');
    },
};