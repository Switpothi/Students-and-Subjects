
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
function checkCode(val) {
    return val.match(/^([0-9]{10})$/);
}

exports.required = (field) => {
    field = parseField(field);   
    return (req, res, next) => {
        if (getField(req, field)) {
            next();
        } else {
            // res.send(${field.join(' ')} is required);
            // res.redirect('back');
            req.flash(`'message', ${field.join(' ')} is required`);
            res.redirect('/students','/');
        }
    };
};
exports.lengthAbove = (field, len) => {
    field = parseField(field);
    return (req, res, next) => {
        if (checkCode(getField(req, field))) {
            next();
        } else {
            const fields = field.join(' ');
            // res.send(${fields} is number and must have equal ${len} characters);
            // res.redirect('back');
            req.flash(`'message', ${fields} is number and must have equal ${len} characters`);
            res.redirect('/students');
        }
    };
};
