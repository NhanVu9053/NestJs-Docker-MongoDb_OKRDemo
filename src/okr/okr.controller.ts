import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ValidateObjectId } from 'src/shared/validate-object-id.pipes';
import { CreateOkrDTO } from './dto/create-okr.dto';
import { OkrService } from './okr.service';

@Controller('okr')
export class OkrController {
    constructor(private okrService: OkrService) { }

    @Get('')
     async getAll(@Res() res) {
    const okrs = await this.okrService.getAll();
    return res.status(HttpStatus.OK).json(okrs);
        }


    @Get(':id')
    async get(@Res() res, @Param('id', new ValidateObjectId()) id) {
    const okr = await this.okrService.get(id);
    if (!okr) {
        throw new NotFoundException('Okr does not exist!');
    }
    return res.status(HttpStatus.OK).json(okr);
    }

    @Post('')
    async create(@Res() res, @Body() createOkrDTO: CreateOkrDTO) {
    const newOkr = await this.okrService.create(createOkrDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Okr has been created successfully!',
      okr: newOkr,
    });
    }

    // Edit a particular post using ID
    @Patch(':id')
    async edit(
        @Res() res,
        @Param('id', new ValidateObjectId()) id,
        @Body() createOkrDTO: CreateOkrDTO,
    ) {
        const editedOkr = await this.okrService.edit(id, createOkrDTO);
        if (!editedOkr) {
            throw new NotFoundException('Okr does not exist!');
        }
        return res.status(HttpStatus.OK).json({
        message: 'OKr has been successfully updated',
        okr: editedOkr,
        });
    }
    // Delete a post using ID
    @Delete(':id')
    async delete(@Res() res, @Param('id', new ValidateObjectId()) id) {
        const deletedOkr = await this.okrService.delete(id);
        if (!deletedOkr) {
            throw new NotFoundException('Okr does not exist!');
        }
        return res.status(HttpStatus.OK).json({
        message: 'Okr has been deleted!',
        okr: deletedOkr,
        });
    }  

}
