import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Good } from "./good.entity";

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, type: "text" })
  name: string;
  @OneToMany(() => Good, (good) => good.shop, {
    cascade: process.env.NODE_ENV !== "production",
  })
  @JoinColumn()
  goods: Good[];
}
