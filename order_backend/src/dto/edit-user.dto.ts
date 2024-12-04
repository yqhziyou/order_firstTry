import {IsNotEmpty, IsInt, IsEnum, IsString, Length, IsOptional, IsIn} from 'class-validator';
import {Exclude, Expose} from "class-transformer";

export class CreateUserDto {
    
    @Length(3, 255)
    @IsNotEmpty()
    user_name: string;
    
    
    @Length(3, 20)
    @IsNotEmpty()
    user_pwd: string;


    @IsOptional()
    @IsEnum(['USER', 'ADMIN', 'DISPLAY'])
    role: 'USER'| 'ADMIN'| 'DISPLAY';
    
}

export class UpdateUserDto {
    @IsNotEmpty() 
    @IsInt()
    user_id: number;

    @IsOptional() 
    @Length(3, 255)
    @IsString()
    user_name?: string;

    @IsOptional() 
    @Length(3, 20)
    @IsString()
    user_pwd?: string;

    @IsOptional() 
    @IsEnum(['USER', 'ADMIN', 'DISPLAY'])
    role?: 'USER'| 'ADMIN'| 'DISPLAY';
}

export class DeleteUserDto {
    @IsNotEmpty()
    @IsInt()
    user_id: number;

    @Length(3, 255)
    @IsNotEmpty()
    user_name: string;
    
    @Length(3, 20)
    @IsNotEmpty()
    user_pwd: string;
    
}

export class LoginUserDto {
    @Length(3, 255)
    @IsNotEmpty()
    user_name: string;

    @Length(3, 20)
    @IsNotEmpty()
    user_pwd: string;
}

export class PublicUserDto {
    @Expose()
    user_id: number;
    
    @Expose()
    user_name: string;
    
    @Expose()
    role: 'USER' | 'ADMIN' | 'DISPLAY';
}
