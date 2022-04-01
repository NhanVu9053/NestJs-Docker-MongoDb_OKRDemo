import { Document } from 'mongoose';
import { Role } from '../entities/role.enum';
    
export interface User extends Document {

  readonly email: string;
  readonly password: string;
  readonly fullName: string;
  readonly phoneNumber: string;
  readonly roles: Role[];
}