const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  getUser,
  updateProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.get(
  '/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex(),
    }),
  }),
  getUserById,
);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
