import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { EditProductComponent } from './components/manage-products/edit-product/edit-product.component';
import { AddProductComponent } from './components/manage-products/add-product/add-product.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { PlaceOrderComponent } from './components/manage-orders/place-order/place-order.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddUserComponent } from './components/manage-users/add-user/add-user.component';
import { UpdateUserComponent } from './components/manage-users/update-user/update-user.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { AddAndEditCategoryComponent } from './components/manage-categories/add-and-edit-category/add-and-edit-category.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'categories', component: ManageCategoriesComponent },
      { path: 'edit-category/:categoryId', component: AddAndEditCategoryComponent },
      { path: 'add-category', component: AddAndEditCategoryComponent },
      { path: 'products', component: ManageProductsComponent },
      { path: 'edit/:id', component: EditProductComponent },
      { path: 'add', component: AddProductComponent },
      { path: 'orders', component: ManageOrdersComponent },
      { path: 'place-order', component: PlaceOrderComponent },
      { path: 'users', component: ManageUsersComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'update-user/:userId', component: UpdateUserComponent },
    ] 
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
