import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { GoodsService } from "./goods.service";
import { ShopsService } from "./shops.service";

@Injectable()
export class TestDataService implements OnApplicationBootstrap {
  constructor(
    private readonly goodsService: GoodsService,
    private readonly shopsService: ShopsService,
  ) {}

  onApplicationBootstrap() {
    if (process.env.ADD_TEST_DATA_IF_EMPTY === "true") {
      this.addTestData();
    }
  }

  async addTestData() {
    if (
      (await this.goodsService.count()) === 0 &&
      (await this.shopsService.count()) === 0
    ) {
      await this.shopsService.saveMany([
        {
          name: "Mc Donny",
          goods: [
            {
              name: "Big Big Burger",
              price: 100,
              image: "https://i.ytimg.com/vi/zi1MMXCuQLQ/maxresdefault.jpg",
            },
            {
              name: "Big Burger",
              price: 90,
              image:
                "https://media.gettyimages.com/id/634462785/photo/extra-large-hamburger.jpg?s=612x612&w=gi&k=20&c=z3eL432b34DIJawLzPqiGAXc4lQ2m3Lx71komxCY-wU=",
            },
            {
              name: "Not So Big Burger",
              price: 80,
              image:
                "https://assets-us-01.kc-usercontent.com/4f365e04-333c-00ab-a1e0-d5cc0e128aa9/be931470-609e-4283-aaa1-a770d90710f1/4683_Big_Burger_Sauce_1036x583.jpg",
            },
            {
              name: "Tiny Burger",
              price: 79,
              image:
                "https://playberry.com.ua/sites/default/files/styles/1920x1080m/public/product_images/fdsfsf.jpg?itok=1flWtFA4",
            },
          ],
        },
        {
          name: "CFK",
          goods: [
            {
              name: "Crispy strips bucket",
              price: 100,
              image:
                "https://kfc.fi/wp-content/uploads/2021/10/Chicken-bucket.png",
            },
            {
              name: "Now I am hungry",
              price: 666,
              image:
                "https://www.godairyfree.org/wp-content/uploads/2020/01/KFC-feature2.jpg",
            },
          ],
        },
        {
          name: "I'm too tired so it is empty",
          goods: [],
        },
      ]);
    }
  }
}
