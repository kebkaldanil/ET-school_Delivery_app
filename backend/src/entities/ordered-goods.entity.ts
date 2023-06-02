import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Good } from "./good.entity";

@Entity()
export class OrderedGood {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
  @ManyToOne(() => Good, { nullable: false })
  good: Good;
  @Column({ type: "int", nullable: false })
  count: number;
}
