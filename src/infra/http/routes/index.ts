import { Router } from 'express'
import { customerRouter } from './customer.routes'
import { administratorRouter } from '@infra/http/routes/administrator.routes'

const router = Router()

router.use(customerRouter)
router.use(administratorRouter)

export { router }
