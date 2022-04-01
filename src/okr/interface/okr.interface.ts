import { Document } from 'mongoose';
import { Kr } from 'src/kr/interface/kr.interface';
    
export interface Okr extends Document {
  readonly name: string;
  readonly krs: Kr[];
}