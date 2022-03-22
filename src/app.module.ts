import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OkrModule } from './okr/okr.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/okrTestDb',{ useNewUrlParser: true }),OkrModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
