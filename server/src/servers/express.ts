import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routerAuth from '../routes/auth'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth', routerAuth)

export default app
