import { Component } from '@angular/core';
import { OrderService } from '../../../../core/services/order/order.service'; 
import { OrderResponse } from '../../../../shared/models/ResponseDTOs/order-response';

@Component({
  selector: 'app-manage-orders',
  standalone: false,
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css'
})
export class ManageOrdersComponent {
  orders: OrderResponse[] = [];
  
  constructor(private orderService: OrderService)
  {
    
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (orders) =>
      {
        this.orders = orders
      },

      error: (err) =>
      {
        console.log('error occured when fetching orders!: ', err)
      }
    })
  }

  viewOrder(order: any) {

  }

  markAsShipped(order: any) {

  }

}
