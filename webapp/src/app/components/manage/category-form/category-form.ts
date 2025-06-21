import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})

export class CategoryForm {

  categoryName!: string;

  categoryService = inject(CategoryService);
  router = inject(Router);

  add(){
    // console.log(this.categoryName);
    this.categoryService.addCategory(this.categoryName).subscribe((result:any) => {
      alert("Category Added!");
      this.router.navigateByUrl("/admin/categories");
    })
  }

}
