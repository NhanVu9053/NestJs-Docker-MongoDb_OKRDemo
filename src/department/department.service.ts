import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Department } from './interface/department.interface';
import { Model } from 'mongoose'
import { CreateDepartmentDTO } from './dto/department.dto';

@Injectable()
export class DepartmentService {
    constructor(@InjectModel('Department') private readonly departmentModel: Model<Department>) { }

    async getAll() {
        const users = await this.departmentModel.find()
                                        .populate('users')
                                        .exec();
        console.log(users);            
        return users;
    }

    async get(id): Promise<Department> {
        const user = await this.departmentModel
        .findById(id)
        .populate('users')
        
        return user;
    }
    
    async create(createDepartment: CreateDepartmentDTO): Promise<Department> {
        const newDepartment = await new this.departmentModel(createDepartment);
        return newDepartment.save();
    }  
        

    async edit(id, createDepartment: CreateDepartmentDTO): Promise<Department> {
        const editedDepartment = await this.departmentModel
        .findByIdAndUpdate(id, createDepartment, { new: true });
        return editedDepartment;
    }

    async delete(id): Promise<any> {
        const deletedDepartment = await this.departmentModel
        .findByIdAndRemove(id);
        return deletedDepartment;
    }

}
