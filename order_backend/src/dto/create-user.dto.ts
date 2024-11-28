import { IsNotEmpty, IsInt, Min, Max, IsEnum } from 'class-validator';

export class CreateOrderDto {
    @IsInt()
    @Min(1)
    create_by: number; // 创建用户ID

    @IsEnum(['pending', 'completed', 'cancelled'])
    status: 'pending' | 'completed' | 'cancelled'; // 订单状态

    @IsInt()
    @Min(1)
    item_id: number; // 菜单项ID

    @IsInt()
    @Min(1)
    @Max(255)
    amount: number; // 订购数量

    @IsNotEmpty()
    note: string; // 备注
}

export class UpdateOrderStatusDto {
    @IsInt()
    orderId: number; // 订单ID

    @IsEnum(['pending', 'completed', 'cancelled'])
    status: 'pending' | 'completed' | 'cancelled'; // 更新的订单状态
}

export class DeleteOrderDto {
    @IsInt()
    orderId: number; // 订单ID
}