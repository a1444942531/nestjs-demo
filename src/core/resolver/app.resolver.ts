import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { RolesGuard } from '../guard/roles.guard';
import { UserService } from '../service/user.service';
import { PrismaService } from '../service/prisma.service';
import { User } from 'src/prisma-model-graphql/model/user.model';

@Resolver()
@UseGuards(RolesGuard)
export class AppResolver {
    constructor(
        private userService: UserService,
        private prisma: PrismaService
    ) { }

    @Query(() => User)
    async hello() {
        let man = await this.prisma.user.findMany()
        man[0].createdTime
        return 123
    }

    async getUser() {
        let alice = await this.prisma.user.findUnique({
            where: {
                id: 1
            }
        })

        return alice
    }
}
