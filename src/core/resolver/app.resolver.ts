import { Logger, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RolesGuard } from '../guard/roles.guard';
import { UserService } from '../service/user.service';
import { User } from 'src/prisma-model-graphql/model/user.model';

@Resolver()
@UseGuards(RolesGuard)
export class AppResolver {
    constructor(
        private userService: UserService,
    ) { }
    
    private readonly logger = new Logger(AppResolver.name)

    @Query(() => Number)
    async hello() {
        // let man = await this.prisma.user.findMany()
        // man[0].createdTime
        return 123
    }

    @Query(() => User)
    async getUser(@Args('id') id: number) {
        this.logger.log("upload -------------------")

        return await this.userService.user({
            id
        })
    }
}
