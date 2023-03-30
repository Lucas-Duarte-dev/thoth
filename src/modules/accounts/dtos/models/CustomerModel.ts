import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class CustomerModel {
  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => Boolean, {
    nullable: true,
  })
  remember_me: boolean
}
