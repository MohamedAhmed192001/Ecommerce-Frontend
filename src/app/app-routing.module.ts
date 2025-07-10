import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { ContactMessageComponent } from './shared/components/navbar/contact-message/contact-message.component';
import { AboutUsComponent } from './shared/components/navbar/about-us/about-us.component';
import { MyMessagesComponent } from './shared/components/navbar/contact-message/my-messages/my-messages.component';

const routes: Routes =
  [
    {
      path: '',
      loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
      path: 'home',
      loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'contact', component: ContactMessageComponent
    },
    {
      path: 'my-messages', component: MyMessagesComponent
    },
    {
      path: 'about', component: AboutUsComponent
    },
    {
      path: 'products',
      loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
    },
    {
      path: 'cart',
      loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule)
    },
    {
      path: 'my-orders',
      loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule)
    },
    {
      path: 'payment',
      loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule)
    },
    {
      path: 'admin',
      canActivate: [adminGuard],
      loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
    },
    { path: '**', redirectTo: 'login' }
    
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
