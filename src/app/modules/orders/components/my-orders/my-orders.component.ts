import { Component } from '@angular/core';
import { OrderResponse } from '../../../../shared/models/ResponseDTOs/order-response';
import { OrderService } from '../../../../core/services/order/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyOrder } from '../../../../shared/models/ResponseDTOs/my-order';




@Component({
  selector: 'app-my-orders',
  standalone: false,
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  myOrders: MyOrder[] = [];

  constructor(private orderService: OrderService, private route: Router,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const userId = this.orderService.getUserIdFromToken();
    this.orderService.getUserOrders(userId).subscribe({
      next: myOrders => { this.myOrders = myOrders },
      error: err => { this.toastr.error('Error when feching my orders') }
    })
  }

}
