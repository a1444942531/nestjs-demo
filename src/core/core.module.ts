import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserController } from './controller/user.controller';
import { TokenController } from './controller/token.controller';
import { UserService } from './service/user.service';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './pipe/validation.pipe';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auto.service';
import { SECRET_KEY } from './constant/user.constant';
import { PrismaService } from './service/prisma.service';
import { AppResolver } from './resolver/app.resolver';
import { RolesGuard } from './guard/roles.guard';

@Global()
@Module({
    imports: [
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            // installSubscriptionHandlers: true,
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
        RolesGuard,
        AuthService, 
        PrismaService,
        /** graphql */
        AppResolver
    ],
    exports: []
})
export class CoreModule { };