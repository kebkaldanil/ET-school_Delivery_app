import { ConflictException, Injectable } from "@nestjs/common";
import { Shop } from "../entities/shop.entity";
import { ShopsRepository } from "../repositories/shops.repository";
import { DeepPartial } from "typeorm";

@Injectable()
export class ShopsService {
  constructor(private shopsRepository: ShopsRepository) {}

  findAll(): Promise<Shop[]> {
    return this.shopsRepository.find();
  }

  count(): Promise<number> {
    return this.shopsRepository.count();
  }

  findOne(id: number): Promise<Shop | null> {
    return this.shopsRepository.findOneBy({ id });
  }

  async save(shop: Partial<Shop>): Promise<Shop> {
    try {
      return await this.shopsRepository.save(shop);
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY" || e.code == 23505) {
        throw new ConflictException("Good already exists");
      }
      throw e;
    }
  }

  saveMany(shops: DeepPartial<Shop>[]): Promise<Shop[]> {
    return this.shopsRepository.save(shops);
  }

  async update(id: number, shop: Partial<Shop>): Promise<boolean> {
    const result = await this.shopsRepository.update(id, shop);
    return result.affected !== 0;
  }

  /**
   * @param {number} id
   * @returns {Promise<boolean>} true if deleted, false otherwise
   */
  async remove(id: number): Promise<boolean> {
    const result = await this.shopsRepository.delete(id);
    return result.affected !== 0;
  }
}
