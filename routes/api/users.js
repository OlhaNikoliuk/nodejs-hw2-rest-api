const express = require('express');
const router = express.Router();

const { joiUserSchema } = require('../../models/user');
const {
  controllerWrapper,
  validation,
  authenticate,
  uploadMiddleware,
} = require('../../middlewares');
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

router.get('/logout', authenticate, controllerWrapper(authController.logOut));
router.get(
  '/current',
  authenticate,
  controllerWrapper(authController.getCurrentUser)
);

router.patch(
  '/avatars',
  authenticate,
  uploadMiddleware.single('avatar'),
  controllerWrapper(authController.addAvatar)
);
module.exports = router;
