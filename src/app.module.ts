import { Module, Controller, Get } from '@nestjs/common';
import { TaskController } from './tasks/tasks.controller';
import { TaskService } from './tasks/tasks.service';

@Controller() 
class AppController {
  @Get()
  root() {
    return { message: 'NestJS Todo Backend is running!' };
  }
}

@Module({
  imports: [],
  controllers: [TaskController, AppController],
  providers: [TaskService],
})
export class AppModule {}
