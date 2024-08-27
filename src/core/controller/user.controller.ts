
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserCreateDto } from '../dto/user.create.dto';
import * as bcrypt from 'bcryptjs'

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get()
    main() {
        const user = this.userService.user({
            id: 1
        })
        return user
    }

    @Post()
    async create(
        @Body() { username, password }: UserCreateDto
    ) {
        const salt = await bcrypt.genSalt(10)
        let encryptedPassword = await bcrypt.hash(password, salt)

        return await this.userService.create({
            username,
            encryptedPassword
        })
    }
}