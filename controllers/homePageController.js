const config = require('../config/config');
const models = require('../models');

module.exports = {

  getCreate: function (req, res) {
    const hbsObject = {
      pageTitle: 'Create Page',
      isLoggedIn: req.cookies[config.cookie] !== undefined,
      username: req.cookies[config.userDetails].username
    };

    return res.render('./expends/create.hbs', hbsObject);
  },

  postCreate: function (req, res) {
    const { merchant, total, category, description, checkbox } = req.body;
    const createdAt = formatDate(new Date());
    const isChecked = checkbox === 'on';
    const creator = req.user.id;

    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    }

    models.Expense.create({ merchant, createdAt, total, category, description, isChecked, creator }).then((createdCourse) => {
      res.redirect('/');
    })
  },

  getDetails: function (req, res) {
    let id = req.params._id;
    models.Expense.findById(id)
      .then((expense) => {
        const hbsObject = {
          pageTitle: 'Create Page',
          isLoggedIn: req.cookies[config.cookie] !== undefined,
          username: req.cookies[config.userDetails].username,
          expense
        };

        res.render('./expends/details.hbs', hbsObject);
      })
  },

  // postEdit: (req, res, next) => {
  //   const { courseId } = req.params;
  //   const { merchant, total, category, description, checkbox } = req.body;
  //   const isChecked = checkbox === 'on';

  //   models.Expense.findByIdAndUpdate(courseId, { merchant, total, category, description, checkbox }).then((updatedCourse) => {
  //     res.redirect(`/details/${courseId}`);
  //   });
  // },
  getDelete: function (req, res) {
    let id = req.params._id;
    models.Expense.findByIdAndRemove(id)
      .then(() => {
        return res.redirect('/');
      })
  },
  // postDelete: function (req, res) {
  //   let id = req.params.id;
  //   deleteBook(id)
  //     .then(() => {
  //       return res.redirect('/');
  //     })
  // },
  // about: function (req, res) {
  //   const hbsObject = {
  //     pageTitle: 'Create Page',
  //     isLoggedIn: req.cookies[config.cookie] !== undefined,
  //     username: config.user.username
  //   };

  //   res.render('404.hbs', hbsObject);
  // },
  getProfile: function (req, res) {
    const hbsObject = {
      pageTitle: 'Create Page',
      isLoggedIn: req.cookies[config.cookie] !== undefined,
      user: req.cookies[config.userDetails.username],
      username: req.cookies[config.userDetails].username
    };

    res.render('./users/profile.hbs', hbsObject);
  }
};