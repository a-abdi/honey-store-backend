import { Injectable } from "@nestjs/common";
import { CartsService } from "src/app/carts/carts.service";
import { Cart } from "src/app/carts/entities/cart.entity";
import { Product } from "src/app/products/entities/product.entity";
import { CartProductInterface } from "../interface/interface";

@Injectable()
export class CartHelper {
  constructor(private readonly cartService: CartsService) {}
    
  getAmount = (carts: Cart) => {
      let amount = 0;
      for (const cart of carts.products) {
        const product = cart.product as Product;
        const totalPrice = product.price - (product.discount || 0);
        amount += totalPrice * cart.quantity;
      }
      return amount;
  };

  getCartProduct = (carts: Cart) => {
    let cartProductList: CartProductInterface[] = [];
    for (const cart of carts.products) {
      const product = cart.product as Product;
      const cartProduct: CartProductInterface = {
          product: product._id,
          code: product.code,
          name: product.name,
          price: product.price,
          discount: product.discount,
          quantity: cart.quantity,
          imageSrc: product.productImagesSrc[0],
      }
      cartProductList.push(cartProduct);
    }
    return cartProductList;
};
}