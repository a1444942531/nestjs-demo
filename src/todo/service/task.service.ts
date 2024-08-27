import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/service/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService
  ) { }

  createTaskList(taskListCreateRequest: Prisma.task_listCreateInput) {
    return this.prisma.task_list.create({
      data: taskListCreateRequest
    })
  }
}
