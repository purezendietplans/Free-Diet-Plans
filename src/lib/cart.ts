export interface CartItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  pdfUrl: string;
  price: number;
}

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('dietCart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (item: CartItem) => {
  const cart = getCart();
  const exists = cart.find(i => i._id === item._id);
  if (!exists) {
    cart.push(item);
    localStorage.setItem('dietCart', JSON.stringify(cart));
  }
  return cart;
};

export const removeFromCart = (id: string) => {
  const cart = getCart().filter(item => item._id !== id);
  localStorage.setItem('dietCart', JSON.stringify(cart));
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem('dietCart');
};

export const getCartCount = (): number => {
  return getCart().length;
};