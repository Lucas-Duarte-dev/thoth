import { Entity } from '@core/domain/Entity'
import { Either, right } from '@core/logic/Either'
import { DomainError } from '@core/domain/errors/DomainError'

type RulesPropsType = {
  name: string
  description: string
}

export class Rules extends Entity<RulesPropsType> {
  constructor(props: RulesPropsType, id?: string) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  static create(props: RulesPropsType, id?: string): Either<DomainError, Rules> {
    return right(new Rules(props, id))
  }
}
