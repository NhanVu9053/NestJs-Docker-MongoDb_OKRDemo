import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, ValidationPipe, Logger } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {};
   

    @Post('/signup')
    async signUp(@Res() res,
        @Body(ValidationPipe) createUserDTO: CreateUserDTO
    ): Promise<void> {
        const newUser = await this.authService.signUp(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: 'User has been created successfully!',
            use: newUser,
        })
    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    async signIn(@Req() req) {
        return this.authService.signIn(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Req() req) {
        return req.user;
    }
    
}

