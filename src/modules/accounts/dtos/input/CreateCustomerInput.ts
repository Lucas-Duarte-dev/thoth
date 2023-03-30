import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateCustomerInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string

  @Field(() => Boolean, {
    nullable: true,
  })
  remember_me?: boolean
}
