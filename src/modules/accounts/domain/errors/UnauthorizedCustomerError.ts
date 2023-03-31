import { DomainError } from '@core/domain/errors/DomainError'

export class UnauthorizedCustomerError extends Error implements DomainError {
  constructor() {
    super('Email or password is invalid.')
    this.name = 'UnauthorizedCustomerError'
  }
}
