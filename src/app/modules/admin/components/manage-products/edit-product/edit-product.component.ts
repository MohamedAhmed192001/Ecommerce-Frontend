import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../../core/services/product.service';
import { envirnment } from '../../../../../../environments/environment';
import { Category } from '../../../../../shared/models/ResponseDTOs/category';
import { CategoryService } from '../../../../../core/services/category/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  standalone: false,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  baseUrl = envirnment.baseUrl;
  productForm: FormGroup;
  productId: number = 0;
  currentImageUrl = '';
  selectedImageFile: File | null = null;
  categories: Category[] = [];
  constructor(private productService: ProductService, private categoryService: CategoryService,
    private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      unitSize: ['', [Validators.required, Validators.min(0)]],
      sku: ['', [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required]
    });

  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
    this.loadCategories();
  }

  loadProduct() {
    this.productService.getProductDetails(this.productId).subscribe({
      next: product => {
        this.productForm.patchValue(product);
        this.currentImageUrl = this.baseUrl + product.imagePath;
        console.log(product);

      },
      error: err => {
        this.toastr.error('Error occureed when fetching product');
        console.error('Error occureed when fetching product: ', err)
      }
    })
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: categories => {
        this.categories = categories;
        console.log(categories);
      },
      error: err => {
        this.toastr.error('Error occureed when fetching categories');
        console.error('Error occureed when fetching categories: ', err)
      }
    })
  }

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImageFile = fileInput.files[0];
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();

      formData.append('name', this.productForm.value.name);
      formData.append('description', this.productForm.value.description);
      formData.append('price', this.productForm.value.price);
      formData.append('stock', this.productForm.value.stock);
      formData.append('unitSize', this.productForm.value.unitSize);
      formData.append('sku', this.productForm.value.sku);
      formData.append('categoryId', this.productForm.value.categoryId);
      if (this.selectedImageFile) 
        formData.append('imageFile', this.selectedImageFile);

      this.productService.editProduct(this.productId, formData).subscribe({
        next: success => {
          this.toastr.success('Product updated successfully!');
            this.router.navigate(['/admin/products']);
            console.log(success);
          },
        error: err => {
          this.toastr.error('Error occureed when updating product');
          console.error('Error occureed when updating product: ', err)
        }
        })
      }
      else
      this.toastr.error('Product Form Invalid');
    }

  
}
