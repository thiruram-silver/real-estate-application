
/* GET Home page. */

module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Real Estate site' });
  });
};
