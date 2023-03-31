import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidatePasswordError extends Error implements DomainError {
  constructor() {
    super('The password is invalid.')
    this.name = 'InvalidatePasswordError'
  }
}
