import { Cart } from "src/app/carts/entities/cart.entity";
import { CartProductInterface } from "../interface/interface";
import { Product } from "src/app/products/entities/product.entity";

export const getCartProduct = (carts: Cart) => {
    let cartProductList: CartProductInterface[] = [];
    for (const cart of carts.products) {
      const product = cart.product as Product;
      const cartProduct: CartProductInterface = {
          productId: product._id,
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