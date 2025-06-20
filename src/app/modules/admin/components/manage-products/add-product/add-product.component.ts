import { Component } from '@angular/core';
import { envirnment } from '../../../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../../shared/models/ResponseDTOs/category';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../../core/services/category/category.service';
import { ProductService } from '../../../../../core/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  baseUrl = envirnment.baseUrl;
  productForm: FormGroup;
  currentImageUrl = '';
  selectedImageFile: File | null = null;
  categories: Category[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService,
    private fb: FormBuilder, private router: Router, private toastr: ToastrService)
  {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      unitSize: [null, Validators.required],
      sku: [null, Validators.required],
      categoryId: [null, Validators.required]
    });
  }


  ngOnInit(): void {
    this.loadCategories();
  }


  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: categories => {
        this.categories = categories;
        console.log(categories);
      },
      error: err => {
        this.toastr.error('Error occureed when fetching categories');
        console.error('Error occureed when fetching categories: ', err);
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

      this.productService.addProduct(formData).subscribe({
        next: success => {
          this.toastr.success('Product added successfully');
          this.router.navigate(['/admin/products']);
          console.log(success);
        },
        error: err => {
          this.toastr.error('Error occureed when adding product');
          console.error('Error occureed when adding product: ', err);
        }
      })
    }
    else
      this.toastr.error('Product Form Invalid');
  }

}
