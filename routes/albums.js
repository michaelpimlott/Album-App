var express = require('express');
var router = express.Router();
var methodOverride = require('method-override');


var genreOptions = ['Rubbish', 'Funxploitation', 'Clearance', 'Civil War Jams', 'Big Banjo', 'Soundtrack', 'Field Recordings', 'Jazz'];
var ratingOptions = [1, 2, 3, 4, 5];

var knex = require('../db/knex');

function Albums() {
  return knex('albums');
}

router.use(methodOverride('_method'));

router.get('/albums', function(req, res, next) {
  Albums().select().then(function(records) {
    res.render('albums/index', {
      allAlbums: records
    });
  });
});

router.get('/albums/new', function(req, res, next) {
  res.render('albums/new');
});

router.get('/albums/:id', function(req, res, next) {
  Albums().where({
    id: req.params.id
  }).first().then(function(record) {
    res.render('albums/show', {
      theAlbum: record
    });
  });
});

router.post('/albums', function(req, res, next) {
  Albums().insert({
    artist: req.body.artist_name,
    name: req.body.album_name,
    genre: req.body.genre,
    stars: req.body.stars,
    explicit: req.body.explicit
  }).then(function() {
    res.redirect('/albums');
  });
});

router.get('/albums/:id/edit', function(req, res, next) {
  Albums().where({
    id: req.params.id
  }).first().then(function(record) {
    res.render('albums/edit', {
      theAlbum: record,
      options: genreOptions
    });
  });
});

router.put('/albums/:id', function(req, res, next) {
  Albums().where({
    id: req.params.id
  }).update({
    artist: req.body.artist_name,
    name: req.body.album_name,
    genre: req.body.genre,
    stars: req.body.stars,
    explicit: req.body.explicit
  }).then(function(record) {
    res.redirect('/albums/' + req.params.id);
  });
});

router.get('/albums/:id/delete', function(req, res, next) {
  Albums().where({
    id: req.params.id
  }).first().then(function(record) {
    res.render('albums/delete', {
      theAlbum: record
    });
  });
});

router.delete('/albums/:id', function(req, res, next) {
  Albums().where({
    id: req.params.id
  }).del().then(function(results) {
    res.redirect('/albums/')
  })
});
module.exports = router;
