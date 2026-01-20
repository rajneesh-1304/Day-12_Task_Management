import { Controller, Get, Post, Body, Param, Query, Delete, Patch } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './taskdto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll( @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNum = +page || 1;
    const limitNum = +limit || 10;
    return this.taskService.findAll(pageNum, limitNum);
  }

  @Get('subtasks')
  findAllSubtask(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNum = +page || 1;
    const limitNum = +limit || 10;
    return this.taskService.findAllSubtask(pageNum, limitNum);
  }

  @Post() 
  createTask(@Body() createTaskDto: CreateTaskDto) { 
    console.log('Received Task:', createTaskDto);
    return this.taskService.create(createTaskDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.taskService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.taskService.remove(+id);
  }

  @Patch(':id/markCompleted')
  update(
    @Param('id') id: string,
  ): any{
    console.log(id)
    return this.taskService.update(+id);
  }

  @Patch(':id/markInProgress')
  updatee(
    @Param('id') id: string,
  ): any{
    console.log(id)
    return this.taskService.updatee(+id);
  }

  @Patch(':id/markInPending')
  updateee(
    @Param('id') id: string,
  ): any{
    console.log(id)
    return this.taskService.updateee(+id);
  }

  @Patch(':id/subtask/:id/markCompleted')
  updateSubtask(
    @Param('id') id: string,
  ): any{
    return this.taskService.updateSubtask(+id);
  }

  @Patch(':id/subtask/:id/markInProgress')
  updateSubtaskk(
    @Param('id') id: string,
  ): any{
    return this.taskService.updateSubtaskk(+id);
  }

  @Patch(':id/subtask/:id/markPending')
  updateSubtaskkk(
    @Param('id') id: string,
  ): any{
    return this.taskService.updateSubtaskkk(+id);
  }
  
}
