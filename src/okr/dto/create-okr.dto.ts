import { IsNotEmpty, IsString } from "class-validator";

export class CreateOkrDTO {

    @IsString()
    @IsNotEmpty()
     name: string;

     krs: string[];
  }