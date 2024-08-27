import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { TOKEN_PREFIX } from '../constant/user.constant';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) {}
  
  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest<Request>()

    console.log(
      context.switchToHttp(), "request"
    )
    if(['/tokens', '/users'].includes(request?.url)) {
      return true
    }
    
    const token = this.extractTokenFromHeader(request)
    try {
      request['user'] = await this.jwtService.verifyAsync(token)
    } catch (error) {
      throw new UnauthorizedException("非法token")      
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    let [type, token] = request?.headers?.authorization?.split(" ") ?? []
    return type == TOKEN_PREFIX ? token : ''
  }
}
