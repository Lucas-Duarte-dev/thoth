import { Either } from '@core/logic/Either'
import { InvalidateJWTToken } from '../errors/InvalidateJWTToken'
import { sign, verify } from 'jsonwebtoken'
import { right, left } from '../../logic/Either'
import { Customer } from '../../../modules/accounts/domain/customer'

type JWTTokenPayload = {
  exp: number
  sub: string
}

export class JWT {
  public readonly customerId: string
  public readonly token: string

  private constructor(customerId: string, token: string) {
    this.customerId = customerId
    this.token = token
  }

  static decoded(token: string): Either<InvalidateJWTToken, JWTTokenPayload> {
    try {
      const decoded = verify(token, process.env.SECRET_KEY) as JWTTokenPayload

      return right(decoded)
    } catch (e) {
      return left(new InvalidateJWTToken())
    }
  }

  static signCustomer(customer_id: string, rule_id?: string): JWT {
    const token = sign({ rule_id }, process.env.SECRET_KEY, {
      subject: customer_id,
      expiresIn: '1d',
    })

    return new JWT(customer_id, token)
  }
}
