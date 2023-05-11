import { Cart } from "src/app/carts/entities/cart.entity";
import { CartProductInterface } from "../interface/interface";

export const getCartProduct = (carts: Cart) => {
    let cartProductList: CartProductInterface[] = [];
    for (const cart of carts.products) {
      const product = cart._id;
      const cartProduct: CartProductInterface = {
          productId: product._id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          quantity: cart.quantity,
          imageSrc: product.imageSrc,
      }
      cartProductList.push(cartProduct);
    }
    return cartProductList;
};