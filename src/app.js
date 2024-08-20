require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const apiRouter = express.Router()
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5001

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
)

const errorException = require('./middlewares/errorException')
const userRouter = require('./modules/userModule/routes/userRoute')
const authRouter = require('./modules/userModule/routes/authRoute')
const blogRouter = require('./modules/blogModule/routes/blogRoute')

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
} else {
  app.use(morgan('dev'))
  const { swaggerUi, swaggerDocument } = require('./config/swagger')
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
app.get('/', (req, res) => {
  res.send('This is CMS-Backend')
})

app.use('/api', apiRouter)
apiRouter.use('/user', userRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/blog', blogRouter)

app.use(errorException)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app
