'use strict';

function parseField(field) {
    return field
        .split(/\[|\]/)
        .filter((s) => s);
}

function getField(req, field) {
    let val = req.body;
    field.forEach((prop) => {
        val = val[prop];
    });
    return val;
}


//checkSubjectCredit ให้มี1ตำแหน่ง
function checkSubjectcreditsub(val) {
    return val.match(/^([0-9]{1})$/);
}

//checkSubjectID ให้มีตัวอักษร4ตัวเลข4
function checkSubjectidsub(val) {
    return val.match(/^([a-zA-Z]{4}\d{4})$/);
}

exports.required = (field) => {
    field = parseField(field);   
    return (req, res, next) => {
        if (getField(req, field)) {
            next();
        } else {
            // res.send(`${field.join(' ')} is required`);
            // res.redirect('back');
            req.flash('message', `${field.join(' ')} is required`);
            res.redirect('/subjects');
        }
    };
};




exports.lengthcreditsub = (field, len) => {
    field = parseField(field);
    return (req, res, next) => {
        if (checkSubjectcreditsub(getField(req, field))) {
            next();
        } else {
            const fields = field.join(' ');
            // res.send(`${fields} is number and must have equal ${len} characters`);
            // res.redirect('back');
            req.flash('message', `${fields} is number and must have equal ${len} characters`);
            res.redirect('/subjects');
        }
    };
};

exports.lengtidsub = (field, len) => {
    field = parseField(field);
    return (req, res, next) => {
        if (checkSubjectidsub(getField(req, field))) {
            next();
        } else {
            const fields = field.join(' ');
            // res.send(`${fields} is number and must have equal ${len} characters`);
            // res.redirect('back');
            req.flash('message', `${fields} is number and must have equal ${len} characters`);
            res.redirect('/subjects');
        }
    };
};