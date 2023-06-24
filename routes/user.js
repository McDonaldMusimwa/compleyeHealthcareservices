const router = require('express').Router();
const userObject =require('../controller/user')

router.post('/user',userObject.createUser);
router.get('/user',userObject.getAllUsers);
router.get('/user/:id',userObject.getUser);
router.delete('/user/:id',userObject.deleteUser);
router.patch('/user/:id',userObject.updateUser);




module.exports = router