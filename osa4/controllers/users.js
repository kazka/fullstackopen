const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1 })

  response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      overage: body.overage,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(User.format(savedUser))

  } catch (exception) {

    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })

  }
})

module.exports = usersRouter
