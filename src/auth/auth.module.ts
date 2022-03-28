import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { LocalStrategy } from './strategies/local.strategy';
require('dotenv').config();


@Module({
    imports:[MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
            PassportModule,
            JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '3600s' },
            }),
            ],
    controllers: [AuthController],
    providers: [AuthService, UserService,LocalStrategy, JwtStrategy],   
})
export class AuthModule {}
