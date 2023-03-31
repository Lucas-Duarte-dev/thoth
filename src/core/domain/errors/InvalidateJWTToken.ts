import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidateJWTToken extends Error implements DomainError {
  constructor() {
    super('Token JWT is invalid.')
    this.name = 'InvalidateJWTToken'
  }
}
