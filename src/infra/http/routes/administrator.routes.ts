import { Router } from 'express'
import { adapterRouter } from '@core/infra/adapter/express/RouteAdapter'
import { makeRegisterAdministratorController } from '@infra/http/factories/controller/RegisterAdministratorControllerFactory'

const administratorRouter = Router()

administratorRouter.post('/admin/register', adapterRouter(makeRegisterAdministratorController()))

export { administratorRouter }
