import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn() // 主键自增
    id: number;

    @Column({ unique: true }) // 唯一约束
    email: string;

    @Column()
    name: string;

    @Column({ nullable: true }) // 可选字段
    age: number;

    @CreateDateColumn() // 自动创建时间戳
    createdAt: Date;

    @UpdateDateColumn() // 自动更新时间戳
    updatedAt: Date;
}
