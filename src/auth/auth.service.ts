import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/interface/user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>,
                                     private jwtService: JwtService) {}

    async signUp(createUserDto: CreateUserDTO): Promise<void> {
        const { email, password, fullName, phoneNumber } = createUserDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new this.userModel({ email, password: hashedPassword,phoneNumber, fullName });
        console.log(user);

        try {
        await user.save();
        } catch (error) {
        if (error.code === 11000) {
            throw new ConflictException('User already exists');
        }
        throw error;
        }
    }
    async signIn(user: User) {
        const payload = { email: user.email, sub: user._id };     
        return {
          accessToken: this.jwtService.sign(payload),
        };
      }
    
    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.userModel.findOne({ email });
    
        if (!user) {
          return null;
        }
    
        const valid = await bcrypt.compare(pass, user.password);
    
        if (valid) {
          return user;
        }
    
        return null;
    }
}
