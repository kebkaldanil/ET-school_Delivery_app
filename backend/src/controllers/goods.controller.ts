import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Good } from "../entities/good.entity";
import { GoodsService } from "../services/goods.service";

@Controller("goods")
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get()
  getGoods(): Promise<Good[]> {
    return this.goodsService.findAll();
  }

  @Get(":id")
  async getGood(@Param("id") id: number): Promise<Good> {
    const good = await this.goodsService.findOne(id);
    if (good === null) {
      throw new NotFoundException({ id });
    }
    return good;
  }

  @Get("for-shop/:id")
  getGoodsForShop(@Param("id") id: number): Promise<Good[]> {
    return this.goodsService.findAllForShop(id);
  }

  @Post()
  async postGood(@Body() obj: Good) {
    const good = await this.goodsService.save(obj);
    if (good === null) {
      throw new ConflictException();
    }
    return { good };
  }

  @Put(":id")
  async putGood(@Param("id") id: number, @Body() obj: Good) {
    const good = await this.goodsService.update(id, obj);
    if (good === null) {
      throw new NotFoundException({ id });
    }
    return { good };
  }

  @Delete(":id")
  async deleteGood(@Param("id") id: number) {
    if (await this.goodsService.remove(id)) {
      return;
    }
    throw new NotFoundException({ id });
  }
}
