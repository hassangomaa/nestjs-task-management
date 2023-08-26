import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dot/create-task.dto';
import { create } from 'domain';
import { GetTasksFilterDto } from './dot/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}
    
    @Get()
    @UsePipes(ValidationPipe)
    getTasks(
        @Query() //its a Query decorator --> /tasks?search=aa&status=vvv&test=www
        filterDto : GetTasksFilterDto): Task[] {
        console.log(filterDto);
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
        return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id : string ) :Task {
        return this.tasksService.getTaskById(id);
    }


    @Post()
    @UsePipes(ValidationPipe)
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
        @Body('status', TaskStatusValidationPipe ) status : Task['status']//its a Body decorator --> send in the body
        ) : Task {
            return this.tasksService.updateTaskByStatus(id, status);
    }
   


}
