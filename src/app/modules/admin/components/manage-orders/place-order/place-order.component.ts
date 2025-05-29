import { Component } from '@angular/core';
import { OrderService } from '../../../../../core/services/order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../../../core/services/cart/cart.service';
import { Order } from '../../../../../shared/models/ResponseDTOs/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  standalone: false,
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {
  checkoutForm: FormGroup;
  cartItems;
  constructor(private orderService: OrderService, private cartService: CartService,
    private fb: FormBuilder, private router: Router) {
    this.cartItems = this.cartService.getCart();
    this.checkoutForm = fb.group({
      phone: ['', Validators.required],
      address: ['', Validators.required],
    })

  }

 
  

  ngOnInit(): void {



   
  }

  getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (!token)
      return '';

    var payload = JSON.parse(atob(token.split('.')[1]));

    return payload['nameId'] || payload['sub']
  }

  placeOrder(): void {

    if (!this.checkoutForm.valid || this.cartItems.length == 0)
      alert('Please fill all fields and ensure the cart is not empty.');

    const order: Order = {
      userId: this.getUserIdFromToken(),
      phone: this.checkoutForm.value.phone,
      address: this.checkoutForm.value.address,
      items: this.cartItems.map(item => ({
        ProductId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }))
    }

    this.orderService.placeOrder(order).subscribe(
      {
        next: () => {
          console.log('Order placed successfully!')
          alert('Order placed successfully!');
          this.cartService.clearCart();
          this.router.navigate(['cart']);
        },
        error: (err) => { console.log('Error when place the order: ', err) }
      }
    )

  }

}
