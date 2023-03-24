const User = require('../models/user')
const {
  BadRequest,
  NotFound,
  InternalServerError
} = require('../utils/errorcode')


const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(InternalServerError).send({ message: 'Произошла ошибка' }))
}

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(NotFound).send({ message: `Пользователь с id:${req.params.id} не найден` })
      }
      return res.status(200).send({ data: user });
    })
    .then(user => res.send(user))
    .catch(() => res.status(InternalServerError).send({ message: 'Произошла ошибка' }))
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BadRequest).send({ message: 'Не указаны обязательные поля' })
      }
      return res.status(InternalServerError).send({ message: 'Произошла ошибка' })
    })
}

const updateProfile = (req, res) => {
  const { name, about } = req.body
  User.findByIdAndUpdate(
    req.user._id,
    { name, about }
  )
    .then((user) => {
      if (!user) {
        return res.status(NotFound).send({ message: `Пользователь с id:${req.params.id} не найден` })
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BadRequest).send({ message: 'Не указаны обязательные поля' })
      }
      return res.status(InternalServerError).send({ message: 'Произошла ошибка' })
    })
}

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar }
  )
    .then((user) => {
      if (!user) {
        return res.status(NotFound).send({ message: `Пользователь с id:${req.params.id} не найден` })
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BadRequest).send({ message: 'Не указаны обязательные поля' })
      }
      return res.status(InternalServerError).send({ message: 'Произошла ошибка' })
    })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateUserAvatar
}