import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-success',
  standalone: false,
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {
  orderId: number = 0;

  constructor(private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    localStorage.removeItem('cart');
    this.toastr.success('Payment successful! Order placed.');
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
  }


}
