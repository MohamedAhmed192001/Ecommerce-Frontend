import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProductsByCategoryComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
