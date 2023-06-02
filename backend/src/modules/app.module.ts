import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShopsModule } from "./shops.module";
import { Good } from "src/entities/good.entity";
import { Shop } from "src/entities/shop.entity";
import { GoodsModule } from "./goods.module";
import { OrderModule } from "./orders.module";
import { Order } from "src/entities/order.entity";
import { OrderedGood } from "src/entities/ordered-goods.entity";
import { ConfigModule } from "@nestjs/config";
import { TestDataModule } from "./test-data.module";

ConfigModule.forRoot({
  isGlobal: true,
});

const type_orm_module = TypeOrmModule.forRoot({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any | 0,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Good, Shop, Order, OrderedGood],
  synchronize: true,
});

@Module({
  imports: [
    type_orm_module,
    ShopsModule,
    GoodsModule,
    OrderModule,
    TestDataModule,
  ],
})
export class AppModule {}
