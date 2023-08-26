import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
 
    @IsNotEmpty({message: 'Title is required'})
    title: string;
    @IsNotEmpty({message: 'Description is required'})
    description: string;
}