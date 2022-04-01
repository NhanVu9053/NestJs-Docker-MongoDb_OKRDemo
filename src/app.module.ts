import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OkrModule } from './okr/okr.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { KrModule } from './kr/kr.module';
import { DepartmentModule } from './department/department.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,      
      load: [ configuration],
      validationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST'); 
        return {
          uri: `mongodb://${username}:${password}@${host}`,
          dbName: database,
        };
      },
      inject: [ConfigService],
    }),
    OkrModule,
    AuthModule,
    UserModule,
    KrModule,
    DepartmentModule ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class AppModule {}
