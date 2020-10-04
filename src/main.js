const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/test.db', (err) => {
    if (err) {
        return console.error(err.message)
    }
    console.log("SUCCESS CONNECT")
});

db.serialize(function() {
    db.run('CREATE TABLE test (id INTEGER, name TEXT)');
    var stmt = db.prepare('INSERT INTO test VALUES (?, ?)');

    for(var i = 0; i < 10; i++) {
        stmt.run(i, "Albert" + i);
    }

    stmt.finalize();

    db.each('SELECT name FROM test', function(err, row) {
        console.log(row.name);
    })

});

db.close();