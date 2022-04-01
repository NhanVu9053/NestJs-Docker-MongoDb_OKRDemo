import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DepartmentSchema } from './entities/department.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Department', schema: DepartmentSchema }]),
    ],
  providers: [DepartmentService],
  controllers: [DepartmentController]
})
export class DepartmentModule {}
