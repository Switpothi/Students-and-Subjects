'use strict';
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school'
});

db.connect((err, client) => {
    if (err) throw err;
    console.log('Connected to database');
});

db.query(`
    CREATE TABLE IF NOT EXISTS subjects (
        id SERIAL,
        PRIMARY KEY(id),
        code INT,
        name text);
`, (err, result) => {
    if (err) throw err;
    console.log('Created table "subjects"');
});

// db.end();

class Subjects {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
    }

    static all(subjects) {
        db.query(`
            SELECT * FROM subjects ORDER BY code
        `, (err, result) => {
            if (err) throw err;
            console.log('Query all %s rows.', result.length);
            subjects(null, result);
        });
    }

    add(cb) {
        db.query(`
                INSERT INTO subjects (code, name) VALUES ('${this['code']}', '${this['name']}')
        `, (err, result) => {
            if (err) return err;
            console.log('Inserted row with id %s', result.insertId);
            cb();
        });
    }

    static get(id, cb) {
        db.query(`
            select * FROM subjects WHERE id=${id}
        `, (err, result) => {
            if(err) throw err;
            console.log('Query all %s rows', result.affectedRows);
            cb(null, result);
        })
    }   

    static delete(id, cb) {
        db.query(`
            DELETE FROM subjects WHERE id=${id}
        `, (err, result) => {
            if(err) throw err;
            console.log('Delete %s rows', result.affectedRows);
            cb();
        })
    }

    update(cb) {
        db.query(`
                UPDATE subjects SET code = '${this['code']}', name = '${this['name']}' WHERE id=${this['id']}
        `, (err, result) => {
            if (err) return err;
            console.log('Update row with id %s', result.id);
            cb();
        });
    }
}

module.exports = Subjects;