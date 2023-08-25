import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dot/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks;
    }

    createTask(CreateTaskDto: CreateTaskDto): Task {
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
}
