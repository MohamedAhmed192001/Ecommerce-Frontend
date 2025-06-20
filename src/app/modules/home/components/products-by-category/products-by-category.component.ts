import { Component } from '@angular/core';
import { Product } from '../../../../shared/models/ResponseDTOs/Product';
import { ProductService } from '../../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { envirnment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-by-category',
  standalone: false,
  templateUrl: './products-by-category.component.html',
  styleUrl: './products-by-category.component.css'
})
export class ProductsByCategoryComponent {
  baseUrl = `${envirnment.baseUrl}`;
  categoryId: number;
  products: Product[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private toastr: ToastrService)
  {
    this.categoryId = Number(route.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProductsByCategory(this.categoryId).subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        this.toastr.error('Error when fetching featured products');
        console.error('Error when fetching featured products!', err)
      }
    })
  }

}
