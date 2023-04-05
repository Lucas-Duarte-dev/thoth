import { prisma } from '@infra/databse/prisma/prisma'
import { randomUUID } from 'node:crypto'

async function main() {
  const adminRuleAlreadyExist = await prisma.rules.findUnique({
    where: {name: 'admin'}
  });
  
  if (!adminRuleAlreadyExist) {
    await prisma.rules.create({
      data: {
        id: randomUUID(),
        name: 'admin',
        description: 'this super administrator, has all permissions.'
      }
    })
  }
}

main()
