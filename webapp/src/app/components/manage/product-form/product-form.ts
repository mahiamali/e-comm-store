import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../services/product';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Brand } from '../../../types/brand';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/category';
import { BrandService } from '../../../services/brand';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
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
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
  });

  categoryService = inject(CategoryService);
  brandService = inject(BrandService);

  brands: Brand[] = [];
  categories: Category[] = [];

  productService = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false;
  id!: string;

  ngOnInit() {
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });

    this.brandService.getBrands().subscribe((result) => {
      this.brands = result;
    });

    this.id = this.route.snapshot.params['id'];
    // console.log(id);
    if (this.id) {
      this.isEdit = true;
      this.productService.getProductByID(this.id).subscribe((result) => {
        // console.log(result);
        for (let index = 0; index < result.images.length; index++) {
          this.addImage();          
        }
        this.productForm.patchValue(result as any);
      });
    } else {
      this.addImage();
    }
  }

  addImage() {
    this.images.push(this.formBuilder.control(null));
  }

  removeImage() {
    this.images.removeAt(this.images.controls.length - 1);
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }

  add() {
    let value = this.productForm.value;
    // console.log(value);
    this.productService.addProduct(value as any).subscribe((result: any) => {
      alert('Product Added!');
      this.router.navigateByUrl('/admin/products');
    });
  }

  update() {
    let value = this.productForm.value;
    // console.log(value);
    this.productService
      .updateProduct(this.id, value as any)
      .subscribe((result: any) => {
        alert('Product Updated!');
        this.router.navigateByUrl('/admin/products');
      });
  }
}
