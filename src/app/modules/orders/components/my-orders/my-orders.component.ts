import { Component } from '@angular/core';
import { OrderResponse } from '../../../../shared/models/ResponseDTOs/order-response';
import { OrderService } from '../../../../core/services/order/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-my-orders',
  standalone: false,
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orders: OrderResponse[] = [];

  constructor(private orderService: OrderService, private route: Router,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {

  }

}
