import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ValidateObjectId } from 'src/shared/validate-object-id.pipes';
import { CreateOkrDTO } from './dto/create-okr.dto';
import { OkrService } from './okr.service';

@Controller('okr')
export class OkrController {
    constructor(private okrService: OkrService) { }



    @Get('okrs')
     async getOkrs(@Res() res) {
    const okrs = await this.okrService.getOkrs();
    return res.status(HttpStatus.OK).json(okrs);
        }


    @Get('okr/:id')
    async getOkr(@Res() res, @Param('id', new ValidateObjectId()) id) {
    const okr = await this.okrService.getOkr(id);
    if (!okr) {
        throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json(okr);
    }

    @Post('/okr')
    async addOkr(@Res() res, @Body() createOkrDTO: CreateOkrDTO) {
    const newOkr = await this.okrService.addOkr(createOkrDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Okr has been created successfully!',
      okr: newOkr,
    });
    }

    // Edit a particular post using ID
    @Patch('/edit/:id')
    async editOkr(
        @Res() res,
        @Param('id', new ValidateObjectId()) id,
        @Body() createOkrDTO: CreateOkrDTO,
    ) {
        const editedOkr = await this.okrService.editOkr(id, createOkrDTO);
        if (!editedOkr) {
            throw new NotFoundException('Okr does not exist!');
        }
        return res.status(HttpStatus.OK).json({
        message: 'OKr has been successfully updated',
        okr: editedOkr,
        });
    }
    // Delete a post using ID
    @Delete('/delete/:id')
    async deletePost(@Res() res, @Param('id', new ValidateObjectId()) id) {
        const deletedOkr = await this.okrService.deleteOkr(id);
        if (!deletedOkr) {
            throw new NotFoundException('Okr does not exist!');
        }
        return res.status(HttpStatus.OK).json({
        message: 'Okr has been deleted!',
        okr: deletedOkr,
        });
    }  

}
