import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsIn, ArrayNotEmpty, IsNumber, ArrayMaxSize, IsDate } from 'class-validator';

export class CreateSubTaskDto {
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

}