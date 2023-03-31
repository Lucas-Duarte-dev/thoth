import { CustomerRepositoryInterface } from '../../repository/CustomerRepositoryInterface'
import { Either, left, right } from '@core/logic/Either'
import { JWT } from '@core/domain/auth/jwt'
import { CustomerAuthExpirationRepositoryInterface } from '@modules/accounts/repository/CustomerAuthExpirationRepositoryInterface'
import { CustomerAuthExpiration } from '../../domain/customerAuthExpiration'
import { UnauthorizedCustomerError } from '@modules/accounts/domain/errors/UnauthorizedCustomerError'
import { DomainError } from '@core/domain/errors/DomainError'

type AuthenticateCustomerRequestInterface = {
  email: string
  password: string
}

type TokenInterface = {
  token: string
}

type AuthenticateCustomerResponseInterface = Either<DomainError, TokenInterface>

export class AuthenticateCustomer {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface,
    private readonly customerAuthExpRepository: CustomerAuthExpirationRepositoryInterface
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateCustomerRequestInterface): Promise<AuthenticateCustomerResponseInterface> {
    const customer = await this.customerRepository.findByEmail(email)

    if (!customer) {
      return left(new UnauthorizedCustomerError())
    }

    const passwordIsValid = customer.password.comparePassword(password)

    if (!passwordIsValid) {
      return left(new UnauthorizedCustomerError())
    }

    const customerHasAuth = await this.customerAuthExpRepository.exists(customer.id)

    const { token } = JWT.signCustomer(customer.id)

    const customerAuthExp = CustomerAuthExpiration.create({
      customer_id: customer.id,
      token,
    })

    if (customerAuthExp.isLeft()) {
      return left(new UnauthorizedCustomerError())
    }

    if (customerHasAuth) {
      await this.customerAuthExpRepository.save(customerAuthExp.value)

      return right({ token })
    }

    await this.customerAuthExpRepository.create(customerAuthExp.value)

    return right({ token })
  }
}
