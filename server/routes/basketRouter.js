const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/:id', authMiddleware, basketController.create)
router.get('/', authMiddleware, basketController.getAll)
router.delete('/:id', authMiddleware, basketController.remove)

module.exports = router