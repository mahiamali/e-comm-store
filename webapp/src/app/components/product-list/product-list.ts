import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer';
import { Product } from '../../types/product';
import { ProductCard } from '../product-card/product-card';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
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
  pageSize = 60;
  products: Product[] = [];
  route = inject(ActivatedRoute)
  categories:Category[] =[]
  brands:Brand[] =[]

  ngOnInit() {
    this.customerService.getCategories().subscribe((result) => {
      this.categories = result;
    })
    this.customerService.getBrands().subscribe((result) => {
      this.brands = result;
    })
    this.route.queryParams.subscribe((x:any)=>{
      console.log(x);
      this.searchTerm = x.search || '';
      this.categoryId = x.categoryid || '';
      // this.brandId = x.brandid;

      this.getProducts();
    })
  }

  getProducts(){
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

}
