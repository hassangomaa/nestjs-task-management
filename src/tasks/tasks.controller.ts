import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

    @Get('/:id')
    getTaskById(@Param('id') id : string ) :Task {
        return this.tasksService.getTaskById(id);
    }


    @Post()
    createTask(
        @Body() CreateTaskDto: CreateTaskDto,
        ): Task {

        return this.tasksService.createTask(CreateTaskDto);
    
    }

    @Delete(':id')
    deleteTaskById(@Param('id') id : string ) :
    void
    // Task
     {
        return this.tasksService.deleteTaskById(id);
        //delete task reurn 200 ok even if task is not found !!!!!!!!!!1
    }

    @Put(':id/status')
    updateTaskByStatus( 
        @Param('id') id : string,//its a Param decorator --> send in the url
        @Body('status') status : Task['status']//its a Body decorator --> send in the body
        ) : Task {
            return this.tasksService.updateTaskByStatus(id, status);
    }
   


}
