import { DomainError } from '@core/domain/errors/DomainError'

export class AdministratorAlreadyExistsError extends Error implements DomainError {
  constructor() {
    super('This administrator already exists.')
    this.name = 'AdministratorAlreadyExistsError'
  }
}
