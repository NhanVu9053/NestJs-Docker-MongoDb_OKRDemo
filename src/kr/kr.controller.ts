import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Req, Res } from '@nestjs/common';

import { ValidateObjectId } from 'src/shared/validate-object-id.pipes';
import { CreateKrDTO } from './dto/create-kr.dto';
import { KrService } from './kr.service';

@Controller('kr')
export class KrController {
    constructor(private krService: KrService) { }


    @Get('')
     async getOkrs(@Res() res) {
    const krs = await this.krService.get();
    return res.status(HttpStatus.OK).json(krs);
    }

    @Get(':id')
    async getOkr(@Res() res, @Param('id', new ValidateObjectId()) id) {
    const kr = await this.krService.getById(id);
    if (!kr) {
        throw new NotFoundException('Kr does not exist!');
    }
    return res.status(HttpStatus.OK).json(kr);
    }
    
    @Post('')
    async create(@Res() res,@Req()req, @Body() createKrDTO: CreateKrDTO) {
    const reqokrId = req.body.okrId;   
    const newKr = await this.krService.create(createKrDTO,reqokrId);
    return res.status(HttpStatus.OK).json({
      message: 'KR has been created successfully!',
      kr: newKr,
    });
    }

    @Patch(':id')
    async editOkr(
        @Res() res,
        @Param('id', new ValidateObjectId()) id,
        @Body() createKrDTO: CreateKrDTO,
    ) {
        const editedKr = await this.krService.edit(id, createKrDTO);
        console.log(editedKr);
        if (!editedKr) {
            throw new NotFoundException('Kr does not exist!');
        }
        return res.status(HttpStatus.OK).json({
        message: 'Kr has been successfully updated',
        okr: editedKr,
        });
    }

    // Delete a post using ID
    @Delete(':id')
    async deletePost(@Res() res, @Param('id', new ValidateObjectId()) id) {
        const deletedKr = await this.krService.delete(id);
        if (!deletedKr) {
            throw new NotFoundException('Kr does not exist!');
        }
        return res.status(HttpStatus.OK).json({
        message: 'Okr has been deleted!',
        kr: deletedKr,
        });
    }  
}
