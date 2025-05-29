import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { CartItem } from '../../../shared/models/CreateDTOs/cart-item';
import { envirnment } from '../../../../environments/environment';

@Component({
  selector: 'app-shopping-cart',
  standalone: false,
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  baseUrl = `${envirnment.baseUrl}`;
  cartItems: CartItem[] = [];
  total = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.total = this.cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity)
    }, 0)
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  increaseQty(item: CartItem): void {
    item.quantity++;
    this.cartService.updateItem(item);
    this.loadCart();
  }

  decreaseQty(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateItem(item);
      this.loadCart();
    }
  }

}
