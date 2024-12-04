import {Body, Controller, Get, Post} from '@nestjs/common';
import { UserService,MenuService } from '../services/management.service'
import { MenuDto, DeleteMenuDto } from "../dto/edit-menu.dto";
import { CreateUserDto, UpdateUserDto, DeleteUserDto,LoginUserDto } from '../dto/edit-user.dto';


@Controller('menuManagement')
export class ManagementController {
    constructor(private readonly menuManager: MenuService,) {};
    
    @Post('createItem')
    async createItem(@Body() menu: MenuDto) {
        console.log('DTO result: ',menu);
        const result = await this.menuManager.createItem(menu);
        return { message:' item on menu has been created successfully!', data:result }
    }
    
    @Post('updateItem')
    async updateItem(@Body() menu: MenuDto) {
        console.log('DTO result: ',menu);
        const result = await this.menuManager.updateItem(menu);
        return { message:' item on menu has been updated successfully!', data:result }
    }
    
    @Post('deleteItem')
    async deleteItem(@Body() menu: DeleteMenuDto) {
        console.log('DTO result: ',menu);
        const result = await this.menuManager.deleteItem(menu);
        return { message:' item on menu has been deleted successfully!', data:result }
    }
    
}

@Controller('userManagement')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post('createUser')
    async createUser(@Body() createUserDto: CreateUserDto) {
        console.log('DTO result: ',createUserDto);
        const result = await this.userService.createUser(createUserDto);
        return { message:' user has been created successfully!', data:result }
    }
    
    @Post('updateUser')
    async updateUser(@Body() updateUserDto: UpdateUserDto) {
        console.log('DTO result: ',updateUserDto);
        const result = await this.userService.updateUser(updateUserDto);
        return { message:' user has been updated successfully!', data:result }
    }
    
    @Post('deleteUser')
    async deleteUser(@Body() deleteUserDto: DeleteUserDto) {
        console.log('DTO result: ',deleteUserDto);
        const result = await this.userService.deleteUser(deleteUserDto);
        return { message:' user has been deleted successfully!', data:result }
    }
    
    @Post('login')
    async login(@Body() loginDto: LoginUserDto) {
        console.log('DTO result: ',loginDto);
        const result = await this.userService.loginUser(loginDto);
        return { message:' user has been login successfully!', data:result }
    }
}