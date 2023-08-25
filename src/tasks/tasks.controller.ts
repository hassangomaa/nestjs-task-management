import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dot/create-task.dto';
import { create } from 'domain';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}
    
    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }
    @Post()
    createTask(
        @Body() CreateTaskDto: CreateTaskDto,
        ): Task {

        return this.tasksService.createTask(CreateTaskDto);
    
    }


}
