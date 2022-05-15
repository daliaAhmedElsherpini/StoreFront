import express from 'express'
import apiRoutes from './routes/api'

// const cors = require('cors')
const app = express()
const port = 3000

app.use(express.json())

// Api Routes
app.use('/api/', apiRoutes)

app.use('/', (_req, res) => {
  res.json('Welcome To Our App')
})

// server
app.listen(port, () => {
  console.log(`listening to the port : ${port}`)
})
export default app
