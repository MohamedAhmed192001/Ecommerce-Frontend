import { Injectable } from '@angular/core';
import { CartItem } from '../../../shared/models/CreateDTOs/cart-item';
import { parse } from 'jest-editor-support';
import { Product } from '../../../shared/models/ResponseDTOs/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'cart-items';
  private emptyCart: CartItem[] = [];
  constructor() { }

  getCart(): CartItem[] {

    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : []
  }

  saveCart(cart: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  addToCart(product: Product): void {
    const cart = this.getCart();

    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    }
    else {
      cart.push({ product, quantity: 1 })
    }

    this.saveCart(cart);
  }

  removeFromCart(productId: number): void {
    const cart = this.getCart().filter(item => item.product.id !== productId);
    this.saveCart(cart);
  }

  clearCart(){
    localStorage.removeItem(this.storageKey);
    
    localStorage.setItem(this.storageKey, JSON.stringify(this.emptyCart));
  }

  updateItem(updatedItem: CartItem): void {
    const cart = this.getCart().map(item =>
      item.product.id === updatedItem.product.id ? updatedItem : item
    );
    this.saveCart(cart);
  }

}
