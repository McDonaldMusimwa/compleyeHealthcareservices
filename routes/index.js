const router = require('express').Router();

router.use('/' , require('./user'))
router.use('/' , require('./tasks'))
module.exports = router