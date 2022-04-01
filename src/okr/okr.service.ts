import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOkrDTO } from './dto/create-okr.dto';
import { Model } from 'mongoose';
import { Okr } from '../okr/interface/okr.interface';

@Injectable()
export class OkrService {
    constructor(@InjectModel('Okr') private readonly okrModel: Model<Okr>) { }

    async getAll() {
        const okrs = await this.okrModel.find()
                                        .populate('krs')
                                        .exec();
        console.log(okrs);            
        return okrs;
    }

    async get(id): Promise<Okr> {
        const okr = await this.okrModel
        .findById(id)
        .populate('krs')
        
        return okr;
    }
    
    async create(createOkrDTO: CreateOkrDTO): Promise<Okr> {
        const newOkr = await new this.okrModel(createOkrDTO);
        return newOkr.save();
    }  
        

    async edit(id, createOkrDTO: CreateOkrDTO): Promise<Okr> {
        const editedOkr = await this.okrModel
        .findByIdAndUpdate(id, createOkrDTO, { new: true });
        return editedOkr;
    }
    async delete(id): Promise<any> {
        const deletedOkr = await this.okrModel
        .findByIdAndRemove(id);
        return deletedOkr;
    }

    // private async preloadFlavorByName(name: string): Promise<Flavor> {
    //     const existingFlavor = await this.flavorRepository.findOne({ name });
    //     if (existingFlavor) {
    //       return existingFlavor;
    //     }
    //     return this.flavorRepository.create({ name });
    //   }
}
