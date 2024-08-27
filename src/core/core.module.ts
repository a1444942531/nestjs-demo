import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserController } from './controller/user.controller';
import { TokenController } from './controller/token.controller';
import { UserService } from './service/user.service';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './pipe/validation.pipe';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auto.service';
import { SECRET_KEY } from './constant/user.constant';
import { AuthGuard } from './guard/auth.guard';
import { HttpExceptionFilter } from './filter/http.filter';
import { PrismaService } from './service/prisma.service';
import { AppResolver } from './resolver/app.resolver';

@Global()
@Module({
    imports: [
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            installSubscriptionHandlers: true,
            autoSchemaFile: true,
        }),
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.register({
            global: true,
            secret: SECRET_KEY,
            signOptions: {
                expiresIn: '30000s'
            }
        })
    ],
    controllers: [
        UserController,
        TokenController
    ],
    providers: [
        UserService, {
            provide: APP_PIPE,
            useClass: ValidationPipe
        },
        AuthService, {
            provide: APP_GUARD,
            useClass: AuthGuard
        }, 
        // {
        //     provide: APP_FILTER,
        //     useClass: HttpExceptionFilter
        // },
        PrismaService,
        /** graphql */
        AppResolver
    ],
    exports: []
})
export class CoreModule { };