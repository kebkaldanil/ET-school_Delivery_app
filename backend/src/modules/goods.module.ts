import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoodsController } from "../controllers/goods.controller";
import { Good } from "../entities/good.entity";
import { GoodsRepository } from "../repositories/goods.repository";
import { GoodsService } from "../services/goods.service";

@Module({
  imports: [TypeOrmModule.forFeature([Good])],
  providers: [GoodsService, GoodsRepository],
  controllers: [GoodsController],
  exports: [GoodsService],
})
export class GoodsModule {}
