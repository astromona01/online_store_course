const Router = require('express')
const router = new Router()

const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const userRouter = require('./userRouter')
const deviceRouter = require('./deviceRouter')
const basketRouter = require('./basketRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)



module.exports = router