import { RulesRepositoryInterface } from '@modules/rules/repository/RulesRepositoryInterface'
import { Rules } from '@modules/rules/domain/rules'
import { prisma } from '@infra/databse/prisma/prisma'
import { RulesMapper } from '@modules/rules/mappers/RulesMapper'

export class PrismaRulesRepository implements RulesRepositoryInterface {
  async findByName(name: string): Promise<Rules> {
    const rules = await prisma.rules.findUnique({
      where: { name },
    })

    return RulesMapper.toDomain(rules)
  }
}
