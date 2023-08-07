var express = require('express');
var sqlite3 = require('sqlite3');
var router = express.Router();


/* var data = [
  {
    id: 0,
    title: "Articolo 0",
    content: "Bla bla bla"
  },
  {
    id: 1,
    title: "Articolo 1",
    content: "Bla bla bla"
  }
]; */

function runQueries(cb) {
  var db = new sqlite3.Database('blog.db');
  res = [];
  db.all(`SELECT * FROM article ORDER BY id DESC LIMIT 9`, (err, rows) => {
      rows.forEach(row => {
          res.push({id: row.id, title:row.title, content:row.content});
      });
      //console.log(res);
      return cb(res);
  });
  
}

/* GET home page. */
router.get('/', function(req, res, next) {
  runQueries((articles) => {
    console.log("Query finished!");
    //console.log.articles();
    res.render('index', { title: 'NazBlog', articles: articles});
  });
});

module.exports = router;
