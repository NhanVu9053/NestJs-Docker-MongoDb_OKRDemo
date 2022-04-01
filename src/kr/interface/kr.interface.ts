import { Document } from 'mongoose';
import { Okr } from 'src/okr/interface/okr.interface';
    
export interface Kr extends Document {
  readonly name: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly okr: string;
}