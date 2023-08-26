import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';  
import { CreateTaskDto } from './dot/create-task.dto';
import { GetTasksFilterDto } from './dot/get-tasks-filter.dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';



@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
      ) {}
    
      async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id } });    //solved by calling where method
        if (!task) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
    
        return task;
      }
    
    

    // private tasks: Task[] = [];

    // getAllTasks() : Task[] { //return type is Task[]
    //     return this.tasks;
    // }
    // getTaskById(id: string): any{
    //   //find() method returns the value of the first element in the provided 
    //   //array that satisfies the provided testing function.

    //     let found = this.tasks.find(task => task.id === id);
    //     if (!found)
    //     { 
    //         throw new NotFoundException(`Task with ID "${id}" not found`); 
    //     }   
    //     else return found;
    //     // its like a for each loop
    // }

    // createTask(CreateTaskDto: CreateTaskDto): Task {//return type is Task

    //     const  {title , description} = CreateTaskDto;//destructuring 
    //     //- same as->>> const title = CreateTaskDto.title; const description = CreateTaskDto.description;
    //     // same as->>> variable = object.property
        
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //         };
    //     this.tasks.push(task);
    //     return task; 
    // }

    // deleteTaskById(id: string): void
    // //  Task  | undefined 
    //  {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);

    // }

    // updateTaskByStatus(id: string, status: Task['status']): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter(task => 
    //             task.title.includes(search) ||
    //              //includes() method determines whether an array includes a certain value among its entries,
    //              // returning true or false as appropriate.
    //             task.description.includes(search),// so if search is in title or description it will return true
    //         );
    //     }
    //     return tasks;
    // }

}
