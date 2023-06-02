import { ConflictException, Injectable } from "@nestjs/common";
import { Good } from "../entities/good.entity";
import { GoodsRepository } from "../repositories/goods.repository";
import { DeepPartial } from "typeorm";

@Injectable()
export class GoodsService {
  constructor(private goodsRepository: GoodsRepository) {}

  findAll(): Promise<Good[]> {
    return this.goodsRepository.find();
  }

  count(): Promise<number> {
    return this.goodsRepository.count();
  }

  findOne(id: number): Promise<Good | null> {
    return this.goodsRepository.findOneBy({ id });
  }

  findAllForShop(id: number): Promise<Good[]> {
    return this.goodsRepository.findAllForShop(id);
  }

  async save(good: DeepPartial<Good>): Promise<Good> {
    try {
      return await this.goodsRepository.save(good);
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY" || e.code == 23505) {
        throw new ConflictException("Good already exists");
      }
      throw e;
    }
  }

  saveMany(goods: Partial<Good>[]): Promise<Good[]> {
    return this.goodsRepository.save(goods);
  }

  async update(id: number, good: Partial<Good>): Promise<Good | null> {
    const result = await this.goodsRepository.update(id, good);
    return result.affected !== 0 ? this.findOne(id) : null;
  }

  /**
   * @param {number} id
   * @returns {Promise<boolean>} true if deleted, false otherwise
   */
  async remove(id: number): Promise<boolean> {
    const result = await this.goodsRepository.delete(id);
    return result.affected !== 0;
  }
}
