import { Document } from 'mongoose';
    
export interface Okr extends Document {
  readonly name: string;
  
}