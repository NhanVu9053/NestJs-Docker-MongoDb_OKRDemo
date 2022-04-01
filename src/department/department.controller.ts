import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Res } from '@nestjs/common';
import { ValidateObjectId } from 'src/shared/validate-object-id.pipes';
import { DepartmentService } from './department.service';
import { CreateDepartmentDTO } from './dto/department.dto';

@Controller('department')
export class DepartmentController {
    constructor(private departmentService: DepartmentService) { }

    @Get('')
     async getAll(@Res() res) {
    const departments = await this.departmentService.getAll();
    return res.status(HttpStatus.OK).json(departments);
        }


    @Get(':id')
    async get(@Res() res, @Param('id', new ValidateObjectId()) id) {
    const department = await this.departmentService.get(id);
    if (!department) {
        throw new NotFoundException('Department does not exist!');
    }
    return res.status(HttpStatus.OK).json(department);
    }

    @Post('')
    async create(@Res() res, @Body() createDepartmentDto: CreateDepartmentDTO) {
    const newDepartment = await this.departmentService.create(createDepartmentDto);
    return res.status(HttpStatus.OK).json({
      message: 'Department has been created successfully!',
      department: newDepartment,
    });
    }

    // Edit a particular post using ID
    @Patch(':id')
    async edit(
        @Res() res,
        @Param('id', new ValidateObjectId()) id,
        @Body() createDepartmentDto: CreateDepartmentDTO,
    ) {
        const editedDepartment = await this.departmentService.edit(id, createDepartmentDto);
        if (!editedDepartment) {
            throw new NotFoundException('Department does not exist!');
        }
        return res.status(HttpStatus.OK).json({
        message: 'Department has been successfully updated',
        department: editedDepartment,
        });
    }
    // Delete a post using ID
    @Delete(':id')
    async delete(@Res() res, @Param('id', new ValidateObjectId()) id) {
        const deletedDepartment = await this.departmentService.delete(id);
        if (!deletedDepartment) {
            throw new NotFoundException('Department does not exist!');
        }
        return res.status(HttpStatus.OK).json({
        message: 'Department has been deleted!',
        department: deletedDepartment,
        });
    }  
}
