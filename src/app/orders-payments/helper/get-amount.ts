export const getAmount = carts => {
    let amount = 0;
    for (const cart of carts.products) {
      const product = cart._id;
      const totalPrice = product.price - (product.discount || 0);
      amount += totalPrice * cart.quantity;
    }
    return amount;
};