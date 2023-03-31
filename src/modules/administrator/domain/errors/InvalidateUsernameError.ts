import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidateUsernameError extends Error implements DomainError {
  constructor() {
    super(`The username information is invalid, please try again`)
    this.name = 'InvalidateUsernameError'
  }
}
