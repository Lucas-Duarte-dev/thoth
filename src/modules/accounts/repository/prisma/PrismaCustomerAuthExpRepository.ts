import { CustomerAuthExpiration } from '@modules/accounts/domain/customerAuthExpiration'
import { CustomerAuthExpirationRepositoryInterface } from '../CustomerAuthExpirationRepositoryInterface'
import { prisma } from '@infra/databse/prisma/prisma'
import { CustomerAuthenticateMapper } from '../../mappers/CustomerAuthenticateMapper'

export class PrismaCustomerAuthExpRepository implements CustomerAuthExpirationRepositoryInterface {
    async exists(customerId: string): Promise<boolean> {
        return !!(await prisma.customerAuthExpiration.findUnique({
            where: { customer_id: customerId },
        }))
    }

    async findByCustomerId(customerId: string): Promise<CustomerAuthExpiration> {
        const customerAuthExp = await prisma.customerAuthExpiration.findUnique({
            where: { customer_id: customerId },
        })

        return CustomerAuthenticateMapper.toDomain(customerAuthExp)
    }

    async create(customerAuth: CustomerAuthExpiration): Promise<void> {
        const data = CustomerAuthenticateMapper.toPersistence(customerAuth)

        await prisma.customerAuthExpiration.create({ data })
    }

    async save(customerAuth: CustomerAuthExpiration): Promise<void> {
        const data = CustomerAuthenticateMapper.toPersistence(customerAuth)

        await prisma.customerAuthExpiration.update({
            where: { customer_id: customerAuth.customerId },
            data,
        })
    }
}
