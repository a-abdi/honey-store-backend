import { Injectable } from "@nestjs/common";
import { CartsService } from "src/app/carts/carts.service";
import { AuthUserInfo } from "src/interface/auth-user-info";

@Injectable()
export class CartHelper {
    constructor(private readonly cartService: CartsService) {}
    
    async removeUserCartGetValue(user: AuthUserInfo, opt: any = {}) {
      return await (await this.cartService.remove(user, opt))?.populate({
        path: 'products', populate: {
          path: 'product',
          model: 'Product'
        }
      });
    }
}