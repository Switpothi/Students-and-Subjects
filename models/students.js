'use strict';
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
   //password: '123',
    database: 'school'
});

db.connect((err, client) => {
    if (err) throw err;
    console.log('Connected to database');
});

db.query(`
    CREATE TABLE IF NOT EXISTS students (
        id SERIAL,
        PRIMARY KEY(id),
        code text,
        name text);
`, (err, result) => {
    if (err) throw err;
    console.log('Created table "students"');
});

// db.end();

class Students {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
    }

    static all(students) {
        db.query(`
            SELECT * FROM students ORDER BY code
        `, (err, result) => {
            if (err) throw err;
            console.log('Query all %s rows.', result.length);
            students(null, result);
        });
    }

    add(cb) {
        db.query(`
                INSERT INTO students (code, name) VALUES ('${this['code']}', '${this['name']}')
        `, (err, result) => {
            if (err) return err;
            console.log('Inserted row with id %s', result.insertId);
            cb();
        });
    }

    static get(id, cb) {
        db.query(`
            select * FROM students WHERE id=${id}
        `, (err, result) => {
            if(err) throw err;
            console.log('Query all %s rows', result.affectedRows);
            cb(null, result);
        })
    }   

    static delete(id, cb) {
        db.query(`
            DELETE FROM students WHERE id=${id}
        `, (err, result) => {
            if(err) throw err;
            console.log('Delete %s rows', result.affectedRows);
            cb();
        })
    }

    update(cb) {
        db.query(`
                UPDATE students SET code = '${this['code']}', name = '${this['name']}' WHERE id=${this['id']}
        `, (err, result) => {
            if (err) return err;
            console.log('Update row with id %s', result.id);
            cb();
        });
    }
}

module.exports = Students;