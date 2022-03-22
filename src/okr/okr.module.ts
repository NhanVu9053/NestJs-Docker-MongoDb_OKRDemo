import { Module } from '@nestjs/common';
import { OkrService } from './okr.service';
import { OkrController } from './okr.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OkrSchema } from '../okr/entities/okr.entity'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Okr', schema: OkrSchema }]),
], 
  providers: [OkrService],
  controllers: [OkrController]
})
export class OkrModule {}
