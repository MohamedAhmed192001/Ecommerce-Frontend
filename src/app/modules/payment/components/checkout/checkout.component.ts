import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../../core/services/cart/cart.service';
import { OrderService } from '../../../../core/services/order/order.service';
import { Order } from '../../../../shared/models/ResponseDTOs/Order';
import { PaymentService } from '../../../../core/services/payment/payment.service';
import { loadStripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  governorates: string[] = [
    'Cairo', 'Giza', 'Alexandria', 'Dakahlia', 'Asyut', 'Qalyubia', 'Sharqia', 'Suez', 'Luxor', 'Minya'
  ];
  stripePromise = loadStripe('pk_test_51R8s7aPF72k9SIzNGW69CKosJGw2maFX4hDZeN7D7e1CQhotIds9qsCBi8jKrMMUvBGLwpcXsSJVYt28t5e5CMDz00AFWNA4Qe');
  checkoutForm: FormGroup;
  cartItems;
  constructor(private paymentService: PaymentService, private cartService: CartService,
    private fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.cartItems = this.cartService.getCart();
    this.checkoutForm = fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-2,5][0-9]{8}$/)]],
    })

  }

  ngOnInit() {
    
  }

  getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (!token)
      return '';

    var payload = JSON.parse(atob(token.split('.')[1]));

    return payload['nameId'] || payload['sub']
  }

  async placeOrderAndPay(): Promise<void> {

    if (!this.checkoutForm.valid || this.cartItems.length == 0)
      this.toastr.error('Please fill all fields and ensure the cart is not empty');

    const fullAddress = `${this.checkoutForm.value.street}, ${this.checkoutForm.value.city}, ${this.checkoutForm.value.region}, ${this.checkoutForm.value.postalCode}`;

    const order: Order = {
      userId: this.getUserIdFromToken(),
      phone: this.checkoutForm.value.phone,
      address: fullAddress,
      items: this.cartItems.map(item => ({
        ProductId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }))
    }

    try {
      const session = await firstValueFrom(this.paymentService.placeOrderAndPay(order));
      this.cartService.clearCart();
      const stripe = await this.stripePromise;
      await stripe?.redirectToCheckout({ sessionId: session.sessionId });
    } catch (err) {
      console.error('Checkout error:', err);
      this.toastr.error('Something went wrong during payment. Please try again');
    }

  }


}
