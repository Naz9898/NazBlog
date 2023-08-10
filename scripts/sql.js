var sqlite3 = require('sqlite3');

function createDatabase() {
    console.log("Create database");
    var newdb = new sqlite3.Database('blog.db', (err) => {
        if (err) {
            console.log("Getting error " + err);
            exit(1);
        }
        
        createTables(newdb); 
    });
    return newdb;
}

function createTables(newdb) {
    console.log("Create table");
    newdb.exec(`
    create table article (
        id int primary key not null,
        title text not null,
        content text default "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
          totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.
          Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos,
          qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur,
          adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. 
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi 
          consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, 
          vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos 
          ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint,
          obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et 
          dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi
          optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, 
          omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, 
          ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, 
          ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
    );`, (err)  => {
        if (err) {
            console.log("Getting error " + err);
        }
        populateTables(newdb);
    });
}

/* 
                (0, 'Final Fantasy XVI'),
                (1, 'Oshi No Ko'),
                (2, 'Suzume'),
                (3, 'Shingeki NO kyojin')
*/

function populateTables(newdb) {
    console.log("Populate table");
    newdb.exec(`
        insert into article (id, title)
        values  (0, 'Final Fantasy XVI'),
                (1, 'The legend of Zelda: Tears of the Kingdom'),
                (2, 'THE FIRST SLAM DUNK'),
                (3, 'Asus ROG Ally'),
                (4, 'Pacific League MVP 2023'),
                (5, 'Pixel 7A'),
                (6, 'Grand Blue'),
                (7, 'Metal Gear Solid 3 Remake'),
                (8, 'Kaguya-sama: Love is War S4'),
                (9, 'Attack on Titan - Final Season'),
                (10, 'Suzume no Tojimari                '),
                (11, 'Oshi No Ko');
        `, (err)  => {
        if (err) {
            console.log("Getting error " + err);
        }
        runQueries();
    });
}

function runQueries() {
    var db = new sqlite3.Database('blog.db');

    db.all(`select * from article`, (err, rows) => {
        rows.forEach(row => {
            console.log(row.id + "\t" + row.title + "\t");
        });

    });
}

db = createDatabase();
//runQueries();