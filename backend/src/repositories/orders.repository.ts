import { Injectable } from "@nestjs/common";
import { Order } from "src/entities/order.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class OrdersRepository extends Repository<Order> {
  constructor(dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }
}
