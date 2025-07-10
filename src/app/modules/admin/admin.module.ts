import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { EditProductComponent } from './components/manage-products/edit-product/edit-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './components/manage-products/add-product/add-product.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { PlaceOrderComponent } from './components/manage-orders/place-order/place-order.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddUserComponent } from './components/manage-users/add-user/add-user.component';
import { UpdateUserComponent } from './components/manage-users/update-user/update-user.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { AddAndEditCategoryComponent } from './components/manage-categories/add-and-edit-category/add-and-edit-category.component';
import { ContactMessagesComponent } from './components/contact-messages/contact-messages.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ManageProductsComponent,
    EditProductComponent,
    AddProductComponent,
    ManageOrdersComponent,
    PlaceOrderComponent,
    ManageUsersComponent,
    AddUserComponent,
    UpdateUserComponent,
    ManageCategoriesComponent,
    AddAndEditCategoryComponent,
    ContactMessagesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
