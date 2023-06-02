import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Shop } from "./shop.entity";

@Entity()
export class Good {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, type: "text" })
  name: string;
  @Column()
  price: number;
  @Column({ type: "text" })
  image: string;
  @ManyToOne(() => Shop, (shop) => shop.goods, { nullable: false })
  shop: Shop;
}
