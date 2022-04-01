import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './entities/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get('')
    async getOkrs(@Res() res) {
    const users = await this.userService.get();
    return res.status(HttpStatus.OK).json(users);
        }

    
}
