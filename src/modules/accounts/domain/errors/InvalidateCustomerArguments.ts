import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidateCustomerArguments extends Error implements DomainError {
  constructor(argument: string) {
    super(`customer arguments ${argument} is invalid.`)
    this.name = 'InvalidateCustomerArguments'
  }
}
