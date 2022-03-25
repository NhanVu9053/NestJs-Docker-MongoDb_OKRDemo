import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user.interface';
import { Model } from 'mongoose';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('')
    async getOkrs(@Res() res) {
    const users = await this.userService.get();
    return res.status(HttpStatus.OK).json(users);
        }


}
