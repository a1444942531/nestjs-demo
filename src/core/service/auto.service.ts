import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { TokenCreateDto } from "../dto/token.create.dto";
import { UserService } from "./user.service";
import * as bcrypt from 'bcryptjs'
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async createToken(tokenCreateRequest: TokenCreateDto) {
        const user = await this.userService.findByUsername(tokenCreateRequest.username)
        if (!user) {
            throw new NotFoundException("用户不存在")
        }

        const isMatch = await bcrypt.compare(
            tokenCreateRequest.password,
            user.encryptedPassword
        )

        if (!isMatch) {
            throw new UnauthorizedException('密码不正确')
        }

        const payload = {
            sub: user.id,
            username: user.username
        }
        return await this.jwtService.signAsync(payload)
    }
}