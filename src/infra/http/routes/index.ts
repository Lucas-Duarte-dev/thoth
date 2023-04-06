import { Router } from 'express'
import { customerRouter } from './customer.routes'

const router = Router()

router.use(customerRouter)

export { router }
