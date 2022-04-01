import { Document } from 'mongoose';
import { User } from 'src/users/interface/user.interface';

    
export interface Department extends Document {

  readonly name: string;

  readonly users: User[];
}