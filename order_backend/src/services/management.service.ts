import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/User';
import { Menu } from "../entities/Menu";
import { MenuDto, DeleteMenuDto,} from "../dto/edit-menu.dto";
import { CreateUserDto, UpdateUserDto, DeleteUserDto, LoginUserDto, PublicUserDto,} from '../dto/edit-user.dto';
import {plainToInstance} from "class-transformer";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<PublicUserDto> {
        const { user_name, user_pwd, role } = createUserDto;

        // 检查用户是否已存在
        const existingUser = await this.userRepository.findOne({ where: { user_name } });
        if (existingUser) {
            throw new ForbiddenException("User already exists!");
        }

        // 加密密码并保存
        const hashedPassword = await bcrypt.hash(user_pwd, 10);
        const newUser = this.userRepository.create({
            user_name,
            user_pwd: hashedPassword,
            role,
        });

        const savedUser = await this.userRepository.save(newUser);
        return plainToInstance(PublicUserDto, savedUser, { excludeExtraneousValues: true,});
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<PublicUserDto> {
        const { user_id, user_name, user_pwd, role } = updateUserDto;

        const user = await this.userRepository.findOne({ where: { user_id } });
        if (!user) {
            throw new NotFoundException(`User with id ${user_id} not found`);
        }

        // 更新用户名和角色
        user.user_name = user_name;
        user.role = role;

        // 如果提供了新密码，则加密并更新
        if (user_pwd) {
            user.user_pwd = await bcrypt.hash(user_pwd, 10);
        }

        const updatedUser = await this.userRepository.save(user);
        return plainToInstance(PublicUserDto, updatedUser, { excludeExtraneousValues: true,});
    }

    async deleteUser(deleteUserDto: DeleteUserDto): Promise<void> {
        const { user_id } = deleteUserDto;

        const user = await this.userRepository.findOne({ where: { user_id } });
        if (!user) {
            throw new NotFoundException(`User with id ${user_id} not found`);
        }

        // 检查用户权限（注意：推荐将此逻辑移到 Guard）
        if (user.role !== 'ADMIN') {
            throw new ForbiddenException(`User with id ${user_id} doesn't have permissions`);
        }

        await this.userRepository.delete({ user_id });
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<PublicUserDto> {
        const { user_name, user_pwd } = loginUserDto;

        const currentUser = await this.userRepository.findOne({ where: { user_name } });
        if (!currentUser) {
            throw new NotFoundException(`User with username ${user_name} not found`);
        }

        // 验证密码
        const isPasswordValid = await bcrypt.compare(user_pwd, currentUser.user_pwd);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid username or password');
        }

        return plainToInstance(PublicUserDto, currentUser, { excludeExtraneousValues: true,});
        
    }
}

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private readonly menuRepository: Repository<Menu>,
    ) {}

    async createItem(menu: MenuDto): Promise<Menu> {
        const { item_id, item_name, price } = menu;
        
        const existingItem = await this.menuRepository.findOne({ where: { item_id } });
        if (existingItem) {
            throw new Error("Item already exists");
        }

        const newItem = this.menuRepository.create({
            item_id,
            item_name,
            price,
        });

        return await this.menuRepository.save(newItem);
    }

    async getMenu(): Promise<Menu[]> {
        return this.menuRepository.find();
    }
    
    async updateItem(menu: MenuDto): Promise<Menu> {
        const { item_id, item_name, price } = menu;

        const currentItem = await this.menuRepository.findOne({ where: { item_id } });
        if (!currentItem) {
            throw new NotFoundException(`Item ${item_name} did not exist`);
        }

        // 更新项目信息
        currentItem.item_name = item_name;
        currentItem.price = price;

        return await this.menuRepository.save(currentItem);
    }

    async deleteItem(deleteMenu: DeleteMenuDto): Promise<void> {
        const { item_id } = deleteMenu;

        const currentItem = await this.menuRepository.findOne({ where: { item_id } });
        if (!currentItem) {
            throw new NotFoundException("Item not found");
        }

        await this.menuRepository.delete({ item_id });
    }
}
