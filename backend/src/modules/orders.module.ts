import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from "src/controllers/order.controller";
import { Order } from "src/entities/order.entity";
import { OrdersRepository } from "src/repositories/orders.repository";
import { OrderService } from "src/services/order.service";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService, OrdersRepository],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
