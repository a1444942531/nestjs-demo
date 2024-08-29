import { Field, ObjectType } from "@nestjs/graphql"
import { Alice } from "./Alice"
import { CustomBaseEntity } from "./CustomBaseEntity"

@ObjectType({ description: "用户信息" })
export class User extends CustomBaseEntity{
    @Field({ description: "用户邮箱" })
    email: String

    @Field(type => Alice)
    alice: Alice
}
