import { Component } from '@angular/core';
import { Category } from '../../../../shared/models/ResponseDTOs/category';
import { CategoryService } from '../../../../core/services/category/category.service';
import { FeaturedProducts } from '../../../../shared/models/ResponseDTOs/featured-products';
import { ProductService } from '../../../../core/services/product.service';
import { envirnment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  baseUrl = `${envirnment.baseUrl}`;
  categories: Category[] = [];
  featuredProducts: FeaturedProducts[] = [];
  constructor(private categoryService: CategoryService,
    private productService: ProductService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.loadCategories();
    this.loadfeaturedProducts();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        this.toastr.error('Error when fetching categories');
        console.error('Error when fetching categories!', err)
      }
    })
  }

  loadfeaturedProducts() {
    this.productService.getFeaturedProducts().subscribe({
      next: (featuredProducts) => {
        this.featuredProducts = featuredProducts;
      },
      error: (err) => {
        this.toastr.error('Error when fetching featured products');
        console.error('Error when fetching featured products!', err)
      }
    })
  }

}
