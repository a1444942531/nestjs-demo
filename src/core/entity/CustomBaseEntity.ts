import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ isAbstract: true })
export abstract class CustomBaseEntity {
    @Field(() => ID, { description: "自增的123123id" })
    id: number
}