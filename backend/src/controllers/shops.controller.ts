import {
  Body,
  Controller,
  ConflictException,
  Delete,
  Get,
  NotFoundException,
  Post,
  Param,
  Put,
} from "@nestjs/common";
import { ShopsService } from "../services/shops.service";
import { Shop } from "src/entities/shop.entity";

@Controller("shops")
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  getShops(): Promise<Shop[]> {
    return this.shopsService.findAll();
  }

  @Get(":id")
  async getShop(@Param("id") id: number): Promise<Shop> {
    console.log(id);
    const shop = await this.shopsService.findOne(id);
    if (shop === null) {
      throw new NotFoundException({ id });
    }
    return shop;
  }

  @Post()
  async postShop(@Body() obj: Shop) {
    const shop = await this.shopsService.save(obj);
    if (shop === null) {
      throw new ConflictException();
    }
    return shop;
  }

  @Put(":id")
  async putShop(@Param("id") id: number, @Body() obj: Shop) {
    const shop = await this.shopsService.update(id, obj);
    if (shop === null) {
      throw new NotFoundException({ id });
    }
    return shop;
  }

  @Delete(":id")
  async deleteShop(@Param("id") id: number) {
    if (await this.shopsService.remove(id)) {
      return;
    }
    throw new NotFoundException({ id });
  }
}
