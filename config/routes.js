const homePageController = require('../controllers/homePageController');
const userController = require('../controllers/userController');
const auth = require('../utils/auth');
const home = require('../controllers/home')

module.exports = (app) => {
    app.get('/', home.startIndex);

    app.post('/', home.refill);

    app.get('/register', userController.getRegister);
    app.post('/register', userController.postRegister);

    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);

    app.get('/logout', auth(), userController.getLogout);

    app.get('/create', homePageController.getCreate);
    app.post('/create', auth(), homePageController.postCreate);

    app.get('/details/:_id', homePageController.getDetails);

    app.get('/delete/:_id', homePageController.getDelete);

    app.get('/profile', homePageController.getProfile);

    app.get('*', (req, res) => { res.render('404.hbs'); });
};