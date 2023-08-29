import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum"; 
import { User } from "src/auth/user.entity";

@Entity()
export class Task extends BaseEntity  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status :TaskStatus;

    //many to one relationship with user
    @ManyToOne(type => User, user => user.tasks, {eager: false})//eager true means that when we load a user we want to get all the tasks as well
    user: User;

}
