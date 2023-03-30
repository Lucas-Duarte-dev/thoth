import 'reflect-metadata'
import express from 'express'
import { router } from './routes'
import cors from 'cors'
import '@infra/crons'
import { bootstrap } from './graphQL'

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)
bootstrap(app)

export { app }
