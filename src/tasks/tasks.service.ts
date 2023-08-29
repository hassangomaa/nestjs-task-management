import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';  
import { CreateTaskDto } from './dot/create-task.dto';
import { GetTasksFilterDto } from './dot/get-tasks-filter.dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { User } from 'src/auth/user.entity';



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
    

      
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
      }


      async deleteTaskById(id: number): Promise<void> {
        const result = await this.taskRepository.delete({ id });
        if (result.affected === 0) { //affected is a property of result so 0 means no task deleted
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
        console.log(result);
      }


      async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
      }

      async getTasksWithFilters(filterDto: GetTasksFilterDto)
      : Promise<Task[]> //array of tasks
      {
        return this.taskRepository.getTasksWithFilters(filterDto);
      }

      async getAllTasks(): Promise<Task[]> {//return type is Task[]
        
        return this.taskRepository.find();//find() method returns all the tasks
      }



    //   async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    //     const { title, description } = createTaskDto;
    //     const task = new Task(); // Create a new instance of Task
    //     task.title = title;
    //     task.description = description;
    //     task.status = TaskStatus.OPEN; // Set the status
      
    //     return await  this.taskRepository.save(task); // Save the task
    //     // return await task.save(); // Save the created task to the database
  
    // }


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
