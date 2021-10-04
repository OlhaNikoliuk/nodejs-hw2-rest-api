const express = require('express');
const router = express.Router();

const { joiUserSchema } = require('../../models/user');
const { controllerWrapper, validation } = require('../../middlewares');
const { authController } = require('../../controllers');

router.post(
  '/signup',
  validation(joiUserSchema),
  controllerWrapper(authController.signUp)
);
router.post(
  '/login',
  validation(joiUserSchema),
  controllerWrapper(authController.logIn)
);
router.get('/logout', controllerWrapper(authController.logOut));

module.exports = router;
