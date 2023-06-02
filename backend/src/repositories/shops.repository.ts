import { Injectable } from "@nestjs/common";
import { Shop } from "../entities/shop.entity";
import { Repository, DataSource } from "typeorm";

@Injectable()
export class ShopsRepository extends Repository<Shop> {
  constructor(dataSource: DataSource) {
    super(Shop, dataSource.createEntityManager());
  }

  /*async insertOne(shop: Partial<Shop>): Promise<Shop | null> {
    const newShop = this.create(shop);
    try {
      await this.save(newShop);
      return newShop;
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") {
        return null;
      }
      throw e;
    }
  }*/
}
