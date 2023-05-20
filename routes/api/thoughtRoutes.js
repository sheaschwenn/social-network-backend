const router = require('express').Router();

// require controllers

router.route('/').get()

router.route('/:thoughtId/reactions').post().delete()