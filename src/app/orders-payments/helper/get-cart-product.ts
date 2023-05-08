import { CartProductInterface } from "./interface";

export const getCartProduct = carts => {
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