import { Injectable } from "@nestjs/common";
import { Order } from "src/entities/order.entity";
import { OrdersRepository } from "src/repositories/orders.repository";

@Injectable()
export class OrderService {
  constructor(private ordersRepository: OrdersRepository) {}

  createOrder(order: Order) {
    return this.ordersRepository.save(order);
  }
}
