import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer';
import { Product } from '../../types/product';
import { ProductCard } from '../product-card/product-card';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, FormsModule, NgClass],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  customerService = inject(CustomerService);
  searchTerm: string = '';
  categoryId: string = '';
  brandId: string = '';
  sortBy: string = '';
  sortOrder: number = -1;
  page = 1;
  currentPage: number = 1;
  pageSize = 3;
  products: Product[] = [];
  route = inject(ActivatedRoute);
  categories: Category[] = [];
  brands: Brand[] = [];

  ngOnInit() {
    this.customerService.getCategories().subscribe((result) => {
      this.categories = result;
    });
    this.customerService.getBrands().subscribe((result) => {
      this.brands = result;
    });
    this.route.queryParams.subscribe((x: any) => {
      console.log(x);
      this.searchTerm = x.search || '';
      this.categoryId = x.categoryid || '';
      this.brandId = x.brandid || '';

      this.getProducts();
    });
  }

  getProducts() {
    this.customerService
      .getProducts(
        this.searchTerm,
        this.categoryId,
        this.brandId,
        this.sortBy,
        this.sortOrder,
        this.page,
        this.pageSize
      )
      .subscribe((result) => {
        this.products = result;
      });
  }

  onSortChange(event: any) {
    const value = +event.target.value; // Convert string to number
    if (value === 0) {
      this.sortBy = '';
      this.sortOrder = -1;
    } else {
      this.sortBy = 'price';
      this.sortOrder = value;
    }

    this.getProducts();
  }

  get totalPagesArray(): number[] {
    return Array(this.pageSize)
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.pageSize) return;
    
    this.page = page;
    this.getProducts(); // re-fetch products based on page
  }
}
