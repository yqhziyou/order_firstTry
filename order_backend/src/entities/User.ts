import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ type: 'varchar', length: 50 })
    user_name: string;

    @Column({ type: 'varchar', length: 255 })
    user_pwd: string;
    
    @Column({ type: 'enum', enum: ['USER', 'ADMIN', 'DISPLAY'] })
    role: 'USER' | 'ADMIN' | 'DISPLAY';

    @OneToMany(() => Order, (order) => order.created_by)
    orders: Order[];
}