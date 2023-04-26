const express = require('express');
const router = express.Router();
const Auth = require('../middleware/Auth');

/* Authentication */
const AuthController = require('../controllers/admin/AuthController');
// router.get('/', AuthController.index);
router.post('/login', AuthController.login);
router.post('/signup', AuthController.signUp);
router.post('/verifyOtp', AuthController.verifyOtp);
router.post('/setPin', AuthController.setPin);
// router.get('/logout', AuthController.logout);
router.get('/list', AuthController.list);

// const RoleController = require('../controllers/admin/RoleController');
// router.get('/role', RoleController.getRole);

/* User */
const UserController = require('../controllers/admin/UserController');
// router.get('/edit-profile', Auth.admin, UserController.index);
router.post('/edit-profile/update', Auth.admin, UserController.profileUpdate);
// router.get('/change-password', Auth.admin, UserController.changePassword);
router.post('/change-password/update', Auth.admin, UserController.changePasswordUpdate);



/* Product */
const ProductController = require('../controllers/admin/ProductController.js');
// router.get('/product', Auth.admin, ProductController.index);
router.post('/product/store', ProductController.store);
router.get('/product/list', ProductController.list);
router.delete('/product/delete', ProductController.delete);
router.post('/product/update', ProductController.update);

const TaskController = require('../controllers/admin/TaskController.js')
router.post('/task/store', TaskController.store);
router.get('/task/list', TaskController.list);
router.post('/task/delete', TaskController.delete);





module.exports = router;