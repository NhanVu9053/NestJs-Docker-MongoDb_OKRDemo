import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { LocalStrategy } from './strategies/local.strategy';
require('dotenv').config();


@Module({
    imports:[MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
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
    controllers: [AuthController],
    providers: [AuthService, UserService,LocalStrategy, JwtStrategy,{
        provide: APP_GUARD,
        useClass: RolesGuard,
      }],   
    exports: [AuthService]
    })
export class AuthModule {}
