import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../../core/services/category/category.service';
import { Category } from '../../../../../shared/models/ResponseDTOs/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-and-edit-category',
  standalone: false,
  templateUrl: './add-and-edit-category.component.html',
  styleUrl: './add-and-edit-category.component.css'
})
export class AddAndEditCategoryComponent {
  categoryForm: FormGroup;
  categoryId: number = 0;
  category: Category = { id: 0, name: '', description: '', imagePath: '' };
  editMode: boolean = false;
  selectedImageFile: File | null = null;


  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private categoryService: CategoryService, private toastr: ToastrService, private router: Router) {
    this.categoryForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    })

  }


  ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId'));
    if (this.categoryId > 0) {
      this.editCategory(this.categoryId);
    }

  }

  editCategory(categoryId: number) {
    this.editMode = true
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (category) => {
        this.categoryForm.patchValue(category);
        this.category = category;

      },
      error: () => {
        this.toastr.error('Error when fetching category');
      }
    })
  }


  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImageFile = fileInput.files[0];
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      if (this.editMode == true) {
        const formData = new FormData();

        formData.append('name', this.categoryForm.value.name);
        formData.append('description', this.categoryForm.value.description);
        if (this.selectedImageFile)
          formData.append('image', this.selectedImageFile);

        this.categoryService.updateCategory(this.categoryId, formData).subscribe({
          next: () => {
            this.toastr.success('Category updated successfully');
            this.router.navigate(['/admin/categories']);
          },
          error: () => {
            this.toastr.error('Error when updating category')

          }
        })

      } else {
        const formData = new FormData();

        formData.append('name', this.categoryForm.value.name);
        formData.append('description', this.categoryForm.value.description);
        if (this.selectedImageFile)
          formData.append('image', this.selectedImageFile);

        this.categoryService.addcategory(formData).subscribe({
          next: () => {
            this.toastr.success('Category created successfully');
            this.router.navigate(['/admin/categories']);
          },
          error: () => {
            this.toastr.error('Error when creating category')

          }
        })
      }
    }
    
  }
}
