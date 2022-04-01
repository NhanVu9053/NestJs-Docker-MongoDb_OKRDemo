import { Module } from '@nestjs/common';
import { KrService } from './kr.service';
import { KrController } from './kr.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { KrSchema } from '../kr/entities/kr.entity';
import { OkrService } from 'src/okr/okr.service';
import { OkrSchema } from 'src/okr/entities/okr.entity';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Kr', schema: KrSchema }]),
  MongooseModule.forFeature([{ name: 'Okr', schema: OkrSchema }])],
  providers: [KrService, OkrService],
  controllers: [KrController],
  exports: [KrService]
})
export class KrModule {}
