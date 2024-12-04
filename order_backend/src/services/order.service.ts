import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { Order } from '../entities/Order';
import { Menu } from "../entities/Menu";
import { CreateOrderDto, DeleteOrderDto, UpdateOrderStatusDto } from "../dto/edit-order.dto";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>,
    ) {}
    
    async createOrder( createOrderDto: CreateOrderDto): Promise<Order> {
        const { create_by, status, item_id, amount, note } = createOrderDto;
        
        const user = await this.userRepository.findOne({ where: { user_id: create_by } });
        if (!user) throw new NotFoundException(`User with id ${create_by} not found`);
        
        const menu = await this.menuRepository.findOne({ where: { item_id: item_id } });
        if (!menu) throw new NotFoundException(`Menu with id ${item_id} not found`);
        
        
        const newOrder = this.orderRepository.create({
            created_by: user, 
            status,
            item_id: menu,
            amount,
            total_price: menu.price * amount,
            note,
        });
        
        return this.orderRepository.save(newOrder);
    }
    
    async updateOrderStatus ( updateOrderStatusDto: UpdateOrderStatusDto ): Promise<Order> {
        const { orderId, status } = updateOrderStatusDto;
        const order = await this.orderRepository.findOne({ where: { order_id: orderId } });
        if (!order) {
            throw new NotFoundException(`Order with id ${orderId} not found`);
        }
        
        order.status = status;
        
        return await this.orderRepository.save(order);
    }
    
    async deleteOrder (deleteOrderDTO: DeleteOrderDto): Promise<void> {
        const { orderId } = deleteOrderDTO;
        const order = await this.orderRepository.findOne({ where: { order_id: orderId } });
        if (!order) {
            throw new NotFoundException(`Order with id ${orderId} not found`);
        }
        
        await this.orderRepository.delete(orderId);
    }
    
    
    
}

