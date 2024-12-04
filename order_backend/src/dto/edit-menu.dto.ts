import {IsNotEmpty, IsInt, Min, Max, IsEnum, IsString, IsNumber} from 'class-validator';

export class MenuDto {
    @IsNotEmpty()
    @IsInt()
    item_id: number;
    
    @IsNotEmpty()
    item_name: string;
    
    @IsNotEmpty()
    @IsNumber()
    price: number;
    
}

export class DeleteMenuDto {
    @IsNotEmpty()
    @IsInt()
    item_id: number;
}