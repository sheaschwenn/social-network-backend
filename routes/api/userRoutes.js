const router = require('express').Router();

// require controllers

router.route('/').get()

router.route('/:userId/friends/:friendId').post().delete()