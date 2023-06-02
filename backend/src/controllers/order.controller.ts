import { Controller, Post, Body } from "@nestjs/common";
import { Order } from "src/entities/order.entity";
import { OrderService } from "src/services/order.service";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() order: Order) {
    return this.orderService.createOrder(order);
  }
}
