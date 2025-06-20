import { Component } from '@angular/core';
import { CategoryService } from '../../../../core/services/category/category.service';
import { Category } from '../../../../shared/models/ResponseDTOs/category';
import { ToastrService } from 'ngx-toastr';
import { envirnment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-categories',
  standalone: false,
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.css'
})
export class ManageCategoriesComponent {
  baseUrl = `${envirnment.baseUrl}/`;
  categories: Category[] = [];

  constructor(private categoryService: CategoryService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: err => {
        this.toastr.error('Error when fetching categories');
      }
    })
  }


  deleteCategory(categoryId: number) {
    confirm('Are you sure to delete');
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.toastr.success('Category deleted successfully');
        this.categories = this.categories.filter(c => c.id != categoryId);
      },
      error: () => {
        this.toastr.error('Error when deleting category');
      }
    })
  }

}
