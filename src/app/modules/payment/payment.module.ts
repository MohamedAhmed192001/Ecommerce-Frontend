import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';



@NgModule({
  declarations: [
    CheckoutComponent,
    PaymentSuccessComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule 
  ]
})
export class PaymentModule { }
