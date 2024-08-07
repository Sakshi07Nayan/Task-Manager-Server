const express = require('express');
const { create, getTasks, update, remove } = require('../controllers/taskController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, create);
router.get('/', auth, getTasks);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

module.exports = router;
