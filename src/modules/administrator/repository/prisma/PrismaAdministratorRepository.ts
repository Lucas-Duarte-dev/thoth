import { Administrator } from '@modules/administrator/domain/administrator'
import { AdministratorRepositoryInterface } from '../AdministratorRepositoryInterface'
import { prisma } from '@infra/databse/prisma/prisma'
import { AdministratorMapper } from '@modules/administrator/mappers/AdministratorMapper'

export class PrismaAdministratorRepository implements AdministratorRepositoryInterface {
  async exists(email?: string, username?: string): Promise<boolean> {
    const hasEmail = await prisma.administratorCustomer.findUnique({
      where: { email },
    })

    if (hasEmail) {
      return true
    }

    return !!(await prisma.administratorCustomer.findUnique({
      where: { username },
    }))
  }

  async findByUsername(username: string): Promise<Administrator> {
    const admin = await prisma.administratorCustomer.findUnique({
      where: { username },
    })

    return AdministratorMapper.toDomain(admin)
  }

  async findByEmail(email: string): Promise<Administrator> {
    const admin = await prisma.administratorCustomer.findUnique({
      where: { email },
    })

    return AdministratorMapper.toDomain(admin)
  }

  async create(admin: Administrator): Promise<void> {
    const data = await AdministratorMapper.toPersistence(admin)

    await prisma.administratorCustomer.create({ data })
  }

  async save(admin: Administrator): Promise<void> {
    const data = await AdministratorMapper.toPersistence(admin)

    await prisma.administratorCustomer.update({
      where: { username: data.username, email: data.email },
      data,
    })
  }
}
