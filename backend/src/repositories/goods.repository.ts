import { Injectable } from "@nestjs/common";
import { Good } from "../entities/good.entity";
import { Repository, DataSource } from "typeorm";

@Injectable()
export class GoodsRepository extends Repository<Good> {
  constructor(dataSource: DataSource) {
    super(Good, dataSource.createEntityManager());
  }

  findAllForShop(id: number): Promise<Good[]> {
    return this.find({ where: { shop: { id } } });
  }
  /*

  async insertOne(shop: Partial<Good>): Promise<Good | null> {
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
