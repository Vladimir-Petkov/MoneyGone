const config = require('../config/config');
const models = require('../models');

module.exports = {
    startIndex: function (req, res) {
        models.Expense.find().then((expense) => {
            const hbsObject = {
                pageTitle: 'Home Page',
                isLoggedIn: req.cookies[config.cookie] !== undefined,
                username: config.user.username,
                expense
            };

            res.render('home.hbs', hbsObject);
        })
    },
    refill: function (req, res) {
        const username = config.user.username;
        const refill = +req.body.refill;

        models.User.findOne({ username })
            .then((user) => {
                user.amount += refill;

                models.User.updateOne(user)
                    .then(() => {
                        res.redirect('/');
                    })
            })

    }
};