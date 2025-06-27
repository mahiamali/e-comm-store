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
  currentPage: number = 1;
  pageSize = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  products: Product[] = [];
  route = inject(ActivatedRoute);
  categories: Category[] = [];
  brands: Brand[] = [];
  isLoading = false;

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
    this.isLoading = true;
    this.customerService
      .getProducts(
        this.searchTerm,
        this.categoryId,
        this.brandId,
        this.sortBy,
        this.sortOrder,
        this.currentPage,
        this.pageSize
      )
      .subscribe((result) => {
        this.products = result.data;
        this.totalItems = result.total;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.isLoading = false;
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
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    this.getProducts(); // re-fetch products based on page

    // Optional: Smooth scroll to top of product list
    setTimeout(() => {
      const el = document.querySelector('.product-list-page');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  get visiblePages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2; // how many numbers to show around current

    if (total <= 10) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const range = [];
    const rangeWithDots: (number | string)[] = [];

    let l = Math.max(2, current - delta);
    let r = Math.min(total - 1, current + delta);

    if (current - delta <= 2) l = 2;
    if (current + delta >= total - 1) r = total - 1;

    range.push(1); // First page

    if (l > 2) rangeWithDots.push('...');
    for (let i = l; i <= r; i++) rangeWithDots.push(i);
    if (r < total - 1) rangeWithDots.push('...');

    rangeWithDots.unshift(1);
    rangeWithDots.push(total);

    return rangeWithDots;
  }
}
