const Students = require('../models/students');

exports.list = (req, res, next) => {
  Students.all((err, students) => {
    if (err) return next(err);
    res.render('students', {
      title: 'Students List',
      message: req.flash('message'),
      students: students
    });
  });
};

exports.addForm = (req, res) => {
  res.render('createStudent', { title: 'Create Student' });
};

exports.create = (req, res, next) => {
  const data = req.body.students;
  const students = new Students({
    code: data.code,
    name: data.name
  });
  students.add((err) => {
    if (err) return next(err);
    req.flash('message', 'New student added.');
    res.redirect('/students');
  });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Students.delete(id, (err) => {
    if (err) return next(err);
    req.flash('message', 'Delete Success.');
    res.redirect('/students');
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id;
  Students.get(id, (err, student) => {
    if (err) return next(err);
    res.render('updateStudent', { title: 'Update Student', student: student });
  });
};


exports.update = (req, res, next) => {
  const data = req.body.students;
  const students = new Students({
    id: data.id,
    code: data.code,
    name: data.name
  });
  students.update((err) => {
    if (err) return next(err);
    req.flash('message', 'Student updated.');
    res.redirect('/students');
  });
};