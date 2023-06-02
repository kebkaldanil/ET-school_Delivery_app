import { Module } from "@nestjs/common";
import { ShopsModule } from "./shops.module";
import { GoodsModule } from "./goods.module";
import { TestDataService } from "src/services/test-data.service";

@Module({
  imports: [ShopsModule, GoodsModule],
  providers: [TestDataService],
})
export class TestDataModule {}
