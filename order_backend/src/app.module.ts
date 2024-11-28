import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusListenerService } from './services/order-status-listener.service';
import { DataService } from './services/data.service';import { Menu } from './entities/Menu';
import { Order } from './entities/Order';
import { User } from './entities/User';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'yqh',
      password: '948621223',
      database: 'postgres',
      autoLoadEntities: true,
      //synchronize: true, 
    }),
    TypeOrmModule.forFeature([Menu, Order, User])
  ],
  controllers: [AppController],
  providers: [OrderStatusListenerService, DataService],
})
export class AppModule {}
