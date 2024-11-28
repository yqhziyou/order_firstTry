import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from './User';
import { Menu } from './Menu';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    order_id: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    finished_at: Date | null;

    @Column({ type: 'enum', enum: ['pending', 'completed', 'cancelled'] })
    status: 'pending' | 'completed' | 'cancelled';

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    total_price: number;
    
    @Column({ type: 'int'})
    amount: number;

    @Column({ type: 'text', nullable: true })
    note: string | null;

    @ManyToOne(() => User, (user) => user.orders, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'created_by' })
    created_by: User;

    @ManyToOne(() => Menu, (menu) => menu.orders, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'menu_id' })
    item_id: Menu;
}