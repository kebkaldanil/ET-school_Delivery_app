import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderedGood } from "./ordered-goods.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "text", nullable: false })
  name: string;
  @Column({ type: "text", nullable: false })
  email: string;
  @Column({ type: "text", nullable: false })
  phone: string;
  @Column({ type: "text", nullable: false })
  address: string;
  @OneToMany(() => OrderedGood, (orderedGood) => orderedGood.order, {
    eager: true,
    cascade: true,
  })
  items: OrderedGood[];
}
