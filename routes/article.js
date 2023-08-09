var express = require('express');
var sqlite3 = require('sqlite3');
var router = express.Router();

function getArticle(id, cb) {
  var db = new sqlite3.Database('blog.db');
  db.all("SELECT * FROM article WHERE id = " + id, (err, rows) => {
      rows.forEach(row => {
          res = {id: row.id, title:row.title, content:row.content};
      });
      //console.log(res);
      return cb(res);
  });
  
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("Got id " + req.query.id);
  getArticle(req.query.id, (article) => {
    console.log("Got the article!");
    res.render('article', {id: article.id, title:article.title, content:article.content});
  });
});

module.exports = router;

