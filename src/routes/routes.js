const express = require('express')
const userRoute = require('./user.route')
const gameRoute = require('./game.route')
const evaluateRoute = require('./evaluate.route')
const typeRoute = require('./type.route')



const router = express.Router()
router.use('/user', userRoute)
router.use('/game', gameRoute)
router.use('/evaluate', evaluateRoute)
router.use('/type', typeRoute)




router.get('/healCheck', (req, res) => res.status(200).send('Welcome to ReviewGame'))

module.exports = router