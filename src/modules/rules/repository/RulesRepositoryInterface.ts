import { Rules } from '@modules/rules/domain/rules'

export interface RulesRepositoryInterface {
  findByName(name: string): Promise<Rules>
}
