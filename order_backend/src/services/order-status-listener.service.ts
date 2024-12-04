import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg';
import { Server } from 'socket.io';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OrderService } from './order.service'; // 导入 OrderService
import { UpdateOrderStatusDto } from "../dto/edit-order.dto";
import { plainToInstance } from 'class-transformer';

@Injectable()
@WebSocketGateway({ cors: true })
export class OrderStatusListenerService implements OnModuleInit {
    private pgClient: Client;

    @WebSocketServer()
    private server: Server;

    constructor(private readonly dataService: OrderService) {} // 注入 OrderService

    async onModuleInit() {
        try {
            // 初始化 PostgreSQL 客户端
            this.pgClient = new Client({
                user: 'yqh',
                host: 'localhost',
                database: 'postgres',
                password: '948621223',
                port: 5432,
            });

            // 尝试连接 PostgreSQL
            await this.pgClient.connect();
            console.log('Connected to PostgreSQL database.');

            // 监听 pg_notify 通道
            try {
                await this.pgClient.query('LISTEN order_status_change');
                console.log('Listening to "order_status_change" channel...');
            } catch (queryError) {
                console.error('Error executing LISTEN query:', queryError);
                return;
            }

            // 捕获通知事件
            this.pgClient.on('notification', async (msg) => {
                try {
                    const payload = JSON.parse(msg.payload);
                    console.log('Order Status Changed:', payload);
                    const updateOrderStatusDto = plainToInstance(UpdateOrderStatusDto, payload);
                    
                    await this.dataService.updateOrderStatus(updateOrderStatusDto);

                    // 推送到 WebSocket 客户端
                    this.server.emit('orderStatusChange', payload);
                } catch (notificationError) {
                    console.error('Error processing notification payload:', notificationError);
                }
            });

        } catch (connectionError) {
            console.error('Error connecting to PostgreSQL:', connectionError);
        }
    }
}
