import { Controller, Get } from '@nestjs/common';

@Controller('task')
export class TaskController {

    @Get()
    helloTask() {
        return "hello task"
    }
}