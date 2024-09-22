const express = require('express');
const router = express.Router();
const { handlePostRequest, handleGetRequest } = require('../controllers/bfhlController');

router.post('/', handlePostRequest);
router.get('/', handleGetRequest);

module.exports = router;