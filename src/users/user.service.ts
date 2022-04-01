import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,) { }

    async get(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async getById(id): Promise<User> {
        const user = await this.userModel
        .findById(id)       
        .exec();
        return user;
    }



}
