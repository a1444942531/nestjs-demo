import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { TokenCreateDto } from '../dto/token.create.dto';
import { AuthService } from '../service/auto.service';

@Controller('tokens')
export class TokenController {
  constructor(private readonly authService: AuthService) { }

  /**
   * 创建token
   * @param tokenCreateRequest 
   * @returns 
   */
  @Post()
  create(@Body() tokenCreateRequest: TokenCreateDto) {
    return this.authService.createToken(tokenCreateRequest)
  }
}
