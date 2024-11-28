import {Body, Controller, Get, Post} from '@nestjs/common';
import { DataService } from './services/data.service';
import { CreateOrderDto, UpdateOrderStatusDto, DeleteOrderDto } from "./dto/create-user.dto";

@Controller('app')
export class AppController {
  constructor(private readonly dataService: DataService) {}

  @Post('create')
  async create(@Body() createOrderDto: CreateOrderDto) {
    console.log('DTO result: ',createOrderDto);
    const result = await this.dataService.createOrder(createOrderDto);
    return { message:' Order data has been created successfully! ', data:result }
  }
  
  @Post('update')
  async update(@Body() updateOrderStatusDto: UpdateOrderStatusDto){
    console.log('DTO result: ', updateOrderStatusDto);
    const result = await this.dataService.updateOrderStatus(updateOrderStatusDto);
    return { message: 'Order status has been updated successfully!', data: result };
  }
  
  @Post('delete')
  async delete(@Body() deleteOrderDto: DeleteOrderDto) {
    console.log('DTO result: ', deleteOrderDto);
    await this.dataService.deleteOrder(deleteOrderDto);
    return { message: 'Order has been deleted successfully!' };
  }
  
}
