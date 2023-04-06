import { Rules as PercistenceCustomer } from '@prisma/client'
import { Rules } from '@modules/rules/domain/rules'

export class RulesMapper {
  static toDomain(raw: PercistenceCustomer): Rules {
    const rules = Rules.create(
      {
        name: raw.name,
        description: raw.description,
      },
      raw.id
    )

    return rules.value as Rules
  }
}
