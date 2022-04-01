import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateKrDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsDate()
    @IsNotEmpty()
    readonly startDate: Date;

    @IsDate()
    @IsNotEmpty()
    readonly endDate: Date;   

    @IsString()
    @IsNotEmpty()
    readonly okr: string;

  }