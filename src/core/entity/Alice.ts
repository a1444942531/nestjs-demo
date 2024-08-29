import { Field, ObjectType } from "@nestjs/graphql"
import { User } from "./User"
import { CustomBaseEntity } from "./CustomBaseEntity"

@ObjectType({ description: "管理员用户" })
export class Alice extends CustomBaseEntity {
    @Field({ description: "用户邮箱" })
    email: String

    @Field(type => User)
    user: User
}