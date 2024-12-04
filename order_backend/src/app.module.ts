import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ManagementController, UserController } from './controllers/management.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusListenerService } from './services/order-status-listener.service';
import { OrderService } from './services/order.service';
import { UserService,MenuService } from './services/management.service'
import { Order } from './entities/Order';
import { User } from './entities/User';
import { Menu } from './entities/Menu';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'yyy',
      password: '123',
      database: 'postgres',
      schema: 'order_system',
      autoLoadEntities: true,
      logging: true,
      //synchronize: true, 
    }),
    TypeOrmModule.forFeature([Menu, Order, User])
  ],
  controllers: [AppController,ManagementController,UserController],
  providers: [OrderStatusListenerService, OrderService, UserService, MenuService],
})
export class AppModule {}
