import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "src/tasks/task.entity";

@Entity()
    //prevent duplicate username
    @Unique(['username'])   
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    salt: string;
    //one to many relationship with tasks
    @OneToMany(type => Task, task => task.user, {eager: true})//eager true means that when we load a user we want to get all the tasks as well
    tasks: Task[];


    //validate password
    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}