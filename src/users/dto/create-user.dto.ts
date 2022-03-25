import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';


export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
     fullName: string;

     @IsPhoneNumber('VN')
     @IsNotEmpty()
     phoneNumber: string;
     
     @IsEmail()
     @IsNotEmpty()
     email: string;

     @IsNotEmpty()
     @MinLength(8,{ message: 'Password is too short (8 characters min)' })
     password: string;
}