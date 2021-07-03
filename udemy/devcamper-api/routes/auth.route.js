const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');

const router = express.Router();

const { protect } = require('../middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;