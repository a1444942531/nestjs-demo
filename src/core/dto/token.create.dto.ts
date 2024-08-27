import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, MinLength } from "class-validator"

export class TokenCreateDto {
    @IsNotEmpty({
        message: '用户名不能为空'
    })
    @ApiProperty()
    username: string

    @IsNotEmpty({
        message: '密码不能为空'
    })
    @MinLength(6, {
        message: '密码至少为6个字符'
    })
    @ApiProperty()
    password: string
}