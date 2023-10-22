const Subjects = require('../models/subjects');

exports.list = (req, res, next) => {
  Subjects.all((err, subjects) => {
    if (err) return next(err);
    res.render('subjects', {
      title: 'Subjects List',
      message: req.flash('message'),
      subjects: subjects
    });
  });
};

exports.addForm = (req, res) => {
  res.render('createSubject', { title: 'Create Subject' });
};

exports.create = (req, res, next) => {
  const data = req.body.subjects;
  const subjects = new Subjects({
    code: data.code,
    name: data.name
  });
  subjects.add((err) => {
    if (err) return next(err);
    req.flash('message', 'New subject added.');
    res.redirect('/subjects');
  });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Subjects.delete(id, (err) => {
    if (err) return next(err);
    req.flash('message', 'Delete Success.');
    res.redirect('/subjects');
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id;
  Subjects.get(id, (err, subject) => {
    if (err) return next(err);
    res.render('updateSubject', { title: 'Update Subject', subject: subject });
  });
};


exports.update = (req, res, next) => {
  const data = req.body.subjects;
  const subjects = new Subjects({
    id: data.id,
    code: data.code,
    name: data.name
  });
  subjects.update((err) => {
    if (err) return next(err);
    req.flash('message', 'Subject updated.');
    res.redirect('/subjects');
  });
};