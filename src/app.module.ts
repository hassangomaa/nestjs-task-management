import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { Task } from './tasks/task.entity';
import { TaskRepository } from './tasks/task.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'taskmanagement',
    //   entities: [Task],
    //   synchronize: true, // In development, set to true for auto schema sync
    // }),
    TypeOrmModule.forFeature([TaskRepository]),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
