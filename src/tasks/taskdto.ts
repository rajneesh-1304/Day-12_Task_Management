import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsIn, ArrayNotEmpty, IsNumber, ArrayMaxSize, IsDate } from 'class-validator';
import { CreateSubTaskDto } from './subtaskdto';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startTime: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endTime: Date;

  @IsNotEmpty()
  userId: number;
  
  @ArrayNotEmpty({ message: 'The list of subtasks cannot be empty.' })
  @ArrayMaxSize(5, { message: 'The list of subtasks cannot exceed 5.' })
  subtask: CreateSubTaskDto[];
}