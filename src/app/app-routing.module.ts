import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =
  [
    {
      path: '',
      loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
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
      path: 'admin',
      loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
    },
    { path: '**', redirectTo: 'login' }
    
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
