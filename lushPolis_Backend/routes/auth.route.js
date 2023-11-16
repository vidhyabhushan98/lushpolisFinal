const controller = require('../controllers/auth.controller');
module.exports = (app) => {
    app.post('/register', function(req, res){
        controller.register(req, res);
    });
    app.post('/login', function(req, res){
        controller.login(req, res);
    });
};