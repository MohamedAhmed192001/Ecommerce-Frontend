import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { EditProductComponent } from './components/manage-products/edit-product/edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './components/manage-products/add-product/add-product.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { PlaceOrderComponent } from './components/manage-orders/place-order/place-order.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ManageProductsComponent,
    EditProductComponent,
    AddProductComponent,
    ManageOrdersComponent,
    PlaceOrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
