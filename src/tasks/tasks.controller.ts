import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
// import { Task } from './task.model';
import { CreateTaskDto } from './dot/create-task.dto';
import { create } from 'domain';
import { GetTasksFilterDto } from './dot/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    
    constructor(private tasksService: TasksService) {}
    
    @Get()
    // @UsePipes(ValidationPipe)// this is a pipe decorator
    getTasks(
        @Query(ValidationPipe) //its a Query decorator --> /tasks?search=aa&status=vvv&test=www
        filterDto : GetTasksFilterDto): Promise<Task[]> {
        console.log(filterDto);
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
        return this.tasksService.getAllTasks();
        }
    }

    @Get(':id')
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
      try {
        const task = await this.tasksService.getTaskById(id);
        return task;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new NotFoundException('Error while fetching task');
      }
    }


    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() CreateTaskDto: CreateTaskDto,
        @Req() req
        ): Promise<Task> {
        const user = req.user;
        return this.tasksService.createTask(CreateTaskDto, user);
    
    }

    @Delete(':id')
    deleteTaskById(@Param('id') id : number ) : Promise<void>
    // void
    // Task
     {
        return this.tasksService.deleteTaskById(id);
        //delete task reurn 200 ok even if task is not found !!!!!!!!!!1
    }

    @Put(':id/status')
    updateTaskByStatus( 
        @Param('id') id : number,//its a Param decorator --> send in the url
        @Body('status', TaskStatusValidationPipe ) status : Task['status']//its a Body decorator --> send in the body
        ) : Promise<Task> {
            return this.tasksService.updateTaskStatus(id, status);
    }
   


}
