import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShopsController } from "../controllers/shops.controller";
import { Shop } from "../entities/shop.entity";
import { ShopsRepository } from "../repositories/shops.repository";
import { ShopsService } from "../services/shops.service";

@Module({
  imports: [TypeOrmModule.forFeature([Shop])],
  providers: [ShopsService, ShopsRepository],
  controllers: [ShopsController],
  exports: [ShopsService],
})
export class ShopsModule {}
