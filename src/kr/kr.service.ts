import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Kr } from './interface/kr.interface';
import { Model } from 'mongoose';
import { CreateKrDTO } from './dto/create-kr.dto';
import { Okr } from '../okr/interface/okr.interface';


@Injectable()
export class KrService {
    constructor(@InjectModel('Kr') private readonly krModel: Model<Kr>,
    @InjectModel('Okr') private readonly okrModel: Model<Okr>){ }


    async get() {
        const krs = await this.krModel.find()
        .populate('okr')
        .exec();
        return krs;
    }

    async getById(id): Promise<Kr> {
        const kr = await this.krModel
        .findById(id)
        .populate('okr')
        .exec();
        console.log(kr);
        return kr;
    }

    async create(createKrDto: CreateKrDTO, okrId): Promise<Kr>  {      
        const newKr = await new this.krModel(
            {...createKrDto, okr: okrId}
            );               
        await newKr.save();
        const okr = await this.okrModel.findById({_id: okrId})      
        okr.krs.push(newKr);
        await okr.save();
        return newKr;
    }

    async edit(id, createKrDto: CreateKrDTO): Promise<Kr> {
        const editedKr = await this.krModel
        .findByIdAndUpdate(id, createKrDto, { new: true });
        return editedKr;
    }

    async delete(id): Promise<any> {
        const deletedKr = await this.krModel
        .findByIdAndRemove(id);
        return deletedKr;
    }

}
