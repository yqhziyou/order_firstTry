import {Body, Controller, Get, Post} from '@nestjs/common';
import { DataService } from './services/data.service';
import { OrderStatusListenerService } from './services/order-status-listener.service';
import { CreateOrderDto } from "./dto/create-user.dto";

@Controller('app')
export class AppController {
  constructor(private readonly orderStatusListenerService: OrderStatusListenerService,
              private readonly dataService: DataService
  ) {}

  @Post('create')
  async create(@Body() createOrderDto: CreateOrderDto) {
    console.log('DTO result: ',createOrderDto);
    const result = await this.dataService.createOrder(createOrderDto);
    return { message:' Order data has been created successfully! ', data:result }
  }
}
