const Card = require('../models/card')
const {
  BadRequest,
  NotFound,
  InternalServerError
} = require('../utils/errorcode')


const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(InternalServerError).send({ message: 'Произошла ошибка' }))
}

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BadRequest).send({ message: 'Не указаны обязательные поля' })
      }
      return res.status(InternalServerError).send({ message: 'Произошла ошибка' })
    })

}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NotFound).send({ message: `Карточка с id:${req.params.cardId} не найдена` })
      }
      return res.status(200).send({ message: 'Карточка удалена' })
    })
    .catch(() => res.status(InternalServerError).send({ message: 'Произошла ошибка' }))
}

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NotFound).send('404 - Карточка с таким id не найдена')
      }
      res.status(200).send({ date: card })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BadRequest).send('400 - Некорректный id')
      }
      res.status(InternalServerError).send({ message: 'Произошла ошибка' })
    })

}

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NotFound).send('404 - Карточка с таким id не найдена')
      }
      res.status(200).send({ date: card })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BadRequest).send('400 - Некорректный id')
      }
      res.status(InternalServerError).send({ message: 'Произошла ошибка' })
    })
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
}
