import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Tasks, SubTask, User } from './tasks.interface';
import { CreateTaskDto } from './taskdto';

@Injectable()
export class TaskService {
  private tasks: Tasks[] = [];

  private subtasks: SubTask[] = [];
  private users: User[] = [
    {
      id: 1,
      name: "Rajneesh",
      email: "abc@gmail.com"
    }, {
      id: 2,
      name: "Shiv",
      email: "xyz@gmail.com"
    }]

  findAll() {
    return this.tasks.map((task) => ({
      task,
      subtask: this.subtasks.filter((s) => s.taskId === task.id),
    }));
  }

  findAllSubtask(): any {
    console.log(this.subtasks);
    return this.subtasks;
  }

  findOne(id: number): Tasks {
    const task = this.tasks.find((p) => p.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  create(taskk: CreateTaskDto) {
    const existingTask = this.tasks.find(
      (task: any) => task.title === taskk.title,
    );

    if (existingTask) {
      throw new BadRequestException('Task title already exists');
    }

    const userExisting = this.users.find(user => user.id === taskk.userId);
    if (!userExisting) {
      throw new BadRequestException('Invalid userId. User does not exist');
    }

    if (taskk.startTime >= taskk.endTime) {
      throw new BadRequestException(
        'Start time must be earlier than end time',
      );
    }
    const taskId = Date.now();

    const data = {
      id: taskId,
      title: taskk.title,
      status: 'pending',
      startTime: taskk.startTime,
      endTime: taskk.endTime,
      userId: taskk.userId,
    };
    this.tasks.push(data);
    console.log('Tasks', this.tasks);

    taskk.subtask.forEach((s) => {
      if (s.startTime >= s.endTime) {
        throw new BadRequestException(
          'Start time must be earlier than end time',
        );
      }
      const subtask: SubTask = {
        id: Date.now(),
        taskId: taskId,
        title: s.title,
        status: 'pending',
        startTime: s.startTime,
        endTime: s.endTime,
      }
      this.subtasks.push(subtask);
    })
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Task added successfully',
    };
  }

  remove(id: number): Tasks {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException('Task not found');
    return this.tasks.splice(index, 1)[0];
  }

  update(id: number): Tasks {
    const task = this.findOne(id);

    if (task.status === 'pending') {
      throw new BadRequestException(
        'Only tasks in progress can be marked as completed',
      );
    }

    if (task.status === 'completed') {
      throw new ConflictException(
        'Task is already completed',
      );
    }

    const sub = this.subtasks.some(
      s => s.taskId === task.id && (s.status === 'pending' || s.status === 'inprogress'),
    );

    if (sub) {
      throw new ConflictException(
        'Cannot mark completed because some subtask is still pending or in progress',
      );
    }

    task.status = 'completed';
    return task;
  }


  updatee(id: number): Tasks {
    const task = this.findOne(id);

    if (task.status === 'completed') {
      throw new ConflictException(
        'Completed tasks cannot be marked as in progress',
      );
    }

    if (task.status === 'inprogress') {
      throw new ConflictException(
        'Task is already in progress',
      );
    }

    task.status = 'inprogress';
    return task;
  }


  updateee(id: number): Tasks {
    const task = this.findOne(id);

    if (task.status === 'completed') {
      throw new ConflictException(
        'Completed tasks cannot be marked as pending',
      );
    }

    if (task.status === 'inprogress') {
      throw new ConflictException(
        'In progress tasks cannot be marked as pending',
      );
    }

    if (task.status === 'pending') {
      throw new ConflictException(
        'Task is already in pending status',
      );
    }

    task.status = 'pending';
    return task;
  }

  updateSubtask(id: number): SubTask {
    const subtask = this.subtasks.find(t => t.id === id);

    if (!subtask) {
      throw new NotFoundException('Subtask not found');
    }

    if (subtask.status === 'pending') {
      throw new BadRequestException(
        'Subtask must be in progress before it can be completed',
      );
    }

    if (subtask.status === 'completed') {
      throw new ConflictException(
        'Subtask is already completed',
      );
    }

    subtask.status = 'completed';
    return subtask;
  }

  updateSubtaskk(id: number): any {
    const subtask = this.subtasks.find(t => t.id === id);

    if (!subtask) {
      throw new NotFoundException('Subtask not found');
    }

    if (subtask.status === 'completed') {
      throw new ConflictException(
        'Subtask is already completed',
      );
    }

    if (subtask.status === 'inprogress') {
      throw new ConflictException(
        'Subtask is already in progress',
      );
    }

    subtask.status = 'inprogress';
  }


  updateSubtaskkk(id: number): any {
    const subtask = this.subtasks.find(t => t.id === id);

    if (!subtask) {
      throw new NotFoundException('Subtask not found');
    }

    if (subtask.status === 'completed') {
      throw new ConflictException(
        'Completed subtasks cannot be marked as pending',
      );
    }

    if (subtask.status === 'inprogress') {
      throw new ConflictException(
        'In progress subtasks cannot be marked as pending',
      );
    }

    if (subtask.status === 'pending') {
      throw new ConflictException(
        'Subtask is already in pending status',
      );
    }

    subtask.status = 'pending';
  }

}
