import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  formBuilder = inject(FormBuilder);
  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    price: [null, [Validators.required]],
    discount: [],
    images: [],
    categoryId: [null, [Validators.required]],
  });

  name!: string;
  shortDescription!: string;
  description!: string;
  price!: string;
  discount!: string;
  images!: string;
  categoryId!: string;

  productService = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false;
  id! : string;

  add(){
    // console.log(this.categoryName);
    // this.productService.addProduct(this.categoryName).subscribe((result:any) => {
    //   alert("Category Added!");
    //   this.router.navigateByUrl("/admin/categories");
    // })
  }

  update(){
    // console.log(this.categoryName);
    // this.productService.updateProduct(this.id, this.categoryName).subscribe((result:any) => {
    //   alert("Category Updated!");
    //   this.router.navigateByUrl("/admin/categories");
    // })
  }
}
