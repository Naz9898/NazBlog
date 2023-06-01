var sqlite3 = require('sqlite3');

function createDatabase() {
    var newdb = new sqlite3.Database('blog.db', (err) => {
        if (err) {
            console.log("Getting error " + err);
            exit(1);
        }
         createTables(newdb); 
    });
}

function createTables(newdb) {
    newdb.exec(`
    create table article (
        id int primary key not null,
        title text not null,
        content text not null,
        date text not null
    );


    insert into article (id, title, content, date)
        values (1, 'Oshi No Ko', 'Long article...', '1 min'),
               (2, 'Suzume', 'Long article...', '2 min'),
               (3, 'Shingeki NO kyojin', 'Long article...', '3 min');
        `, ()  => {
            runQueries(newdb);
    });
}

function runQueries(db) {
    db.all(`select * from article`, (err, rows) => {
        rows.forEach(row => {
            console.log(row.id + "\t" + row.title + "\t" + row.content + "\t" + row.date);
        });
    });
}
createDatabase();