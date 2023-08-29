import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dot/create-task.dto'; 
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dot/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask({ title, description }: CreateTaskDto, user : User): Promise<Task> {
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      // userId: user.id,
    });
    task.user = user;

    await this.save(task);
    return task;
  }


  async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task'); //task is an alias for the Task entity
    // By using parameterized queries in the queryBuilder.andWhere() methods, you ensure 
    // that user input is properly escaped and sanitized, reducing the risk of SQL injection.

    if (status) {
      query.andWhere('task.status = :status', { status }); //status is a parameter
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)', //search is a parameter
        { search: `%${search}%` },//like is a sql operator - same as c++ variable passing
      );
    }
    const tasks = await query.getMany();//return all the tasks
    return tasks;
  }


}
