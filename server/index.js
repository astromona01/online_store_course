require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileupload = require('express-fileupload')
const path = require('path')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const port = process.env.PORT || 5000

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(bodyParser.json())
app.use(cors())
app.use(fileupload({}))
app.use('/api', router)


app.use(errorHandler)

const start = async () => {
		try {
				await sequelize.authenticate()
				await sequelize.sync()
				app.listen(port, () => {
						console.log(`server started on ${port} port`)
				})
		}catch(e) {
				console.log(e)
		}
}

start()

