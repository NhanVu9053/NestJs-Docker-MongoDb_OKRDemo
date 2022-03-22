import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOkrDTO } from './dto/create-okr.dto';
import { Model } from 'mongoose';
import { Okr } from '../okr/interface/okr.interface';

@Injectable()
export class OkrService {
    constructor(@InjectModel('Okr') private readonly okrModel: Model<Okr>) { }
    
    async addOkr(createOkrDTO: CreateOkrDTO): Promise<Okr> {
        const newOkr = await new this.okrModel(createOkrDTO);
        return newOkr.save();
    }  
        
    async getOkr(id): Promise<Okr> {
        const okr = await this.okrModel
        .findById(id)
        .exec();
        return okr;
    }
        
    async getOkrs(): Promise<Okr[]> {
        const okrs = await this.okrModel.find().exec();
        return okrs;
    }

    async editOkr(id, createOkrDTO: CreateOkrDTO): Promise<Okr> {
        const editedOkr = await this.okrModel
        .findByIdAndUpdate(id, createOkrDTO, { new: true });
        return editedOkr;
    }
    async deleteOkr(id): Promise<any> {
        const deletedOkr = await this.okrModel
        .findByIdAndRemove(id);
        return deletedOkr;
    }
}
