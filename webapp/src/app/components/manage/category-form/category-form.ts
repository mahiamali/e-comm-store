import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category';
import { ActivatedRoute, Router } from '@angular/router';

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
  route = inject(ActivatedRoute);
  isEdit = false;
  id! : string;

  ngOnInit(){
    this.id = this.route.snapshot.params["id"];
    // console.log(id);
    if(this.id){
      this.isEdit = true;
      this.categoryService.getCategoriesByID(this.id).subscribe((result)=>{
        console.log(result);
        this.categoryName = result.name
      })
    }
  }

  add(){
    // console.log(this.categoryName);
    this.categoryService.addCategory(this.categoryName).subscribe((result:any) => {
      alert("Category Added!");
      this.router.navigateByUrl("/admin/categories");
    })
  }

  update(){
    // console.log(this.categoryName);
    this.categoryService.updateCategory(this.id, this.categoryName).subscribe((result:any) => {
      alert("Category Updated!");
      this.router.navigateByUrl("/admin/categories");
    })
  }

}
