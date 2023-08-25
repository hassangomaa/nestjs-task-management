import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dot/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() : Task[] { //return type is Task[]
        return this.tasks;
    }

    getTaskById(id: string): Task {
      //find() method returns the value of the first element in the provided 
      //array that satisfies the provided testing function.
        return this.tasks.find(task => task.id === id);
        // its like a for each loop
    }

    createTask(CreateTaskDto: CreateTaskDto): Task {//return type is Task

        const  {title , description} = CreateTaskDto;//destructuring 
        //- same as->>> const title = CreateTaskDto.title; const description = CreateTaskDto.description;
        // same as->>> variable = object.property
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
            };
        this.tasks.push(task);
        return task; 
    }

    deleteTaskById(id: string): void
    //  Task  | undefined 
     {
        this.tasks = this.tasks.filter(task => task.id !== id);

        // const index = this.tasks.findIndex(task => task.id === id);
        
        // if (index !== -1) {
        //     const deletedTask = this.tasks.splice(index, 1)[0];
        //     return deletedTask;
        // }
        
        // return undefined; // Task not found
    }

}
