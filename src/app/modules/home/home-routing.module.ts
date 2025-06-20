import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':id', component: ProductsByCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
