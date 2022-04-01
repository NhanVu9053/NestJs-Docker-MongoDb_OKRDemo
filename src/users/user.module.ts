import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtStrategy } from 'src/auth/strategies/jwt-auth.strategy';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { UserSchema } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
require('dotenv').config();

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
            PassportModule.register({
              defaultStrategy: 'jwt',
              property: 'user',
              session: false,
          }),
            JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60s' },
            }),
          ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy,LocalStrategy,AuthService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
  exports: [UserService]
})
export class UserModule {}
