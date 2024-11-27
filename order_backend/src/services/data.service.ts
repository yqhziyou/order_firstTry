import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { Order } from '../entities/Order';
import { Menu } from "../entities/Menu";

@Injectable()
export class DataService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>,
    ) {}
    
    async createOrder(create_by: number, status: string, order_name: string, ): Promise<Order> {
        const newOrder = new this.orderRepository.create( create_by, status, order_name, create_by )
    }
    
}

