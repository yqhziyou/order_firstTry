import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity('menu')
export class Menu {
    @PrimaryGeneratedColumn()
    item: number;

    @Column({ type: 'varchar', length: 50 })
    item_name: string;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    price: number;

    @OneToMany(() => Order, (order) => order.item_id)
    orders: Order[];
}