import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { EditProductComponent } from './components/manage-products/edit-product/edit-product.component';
import { AddProductComponent } from './components/manage-products/add-product/add-product.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { PlaceOrderComponent } from './components/manage-orders/place-order/place-order.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'products', component: ManageProductsComponent },
      { path: 'edit/:id', component: EditProductComponent },
      { path: 'add', component: AddProductComponent },
      { path: 'orders', component: ManageOrdersComponent },
      { path: 'placeOrder', component: PlaceOrderComponent },
    ] 
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
