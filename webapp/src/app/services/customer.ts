import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { Category } from '../types/category';
import { Brand } from '../types/brand';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  http = inject(HttpClient);

  getNewProducts() {
    return this.http.get<Product[]>(
      environment.apiUrl + '/customer/new-products'
    );
  }

  getFeaturedProducts() {
    return this.http.get<Product[]>(
      environment.apiUrl + '/customer/featured-products'
    );
  }

  getCategories() {
    return this.http.get<Category[]>(
      environment.apiUrl + '/customer/categories'
    );
  }

  getBrands() {
    return this.http.get<Brand[]>(environment.apiUrl + '/customer/brands');
  }
 
  getProducts(
    searchTerm: string,
    categoryId: string,
    brandId: string,
    sortBy: string,
    sortOrder: number,
    page: number,
    pageSize: number
  ): Observable<{ data: Product[]; total: number }> {
    return this.http.get<{ data: Product[]; total: number }>(
      `${environment.apiUrl}/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&brandId=${brandId}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`
    );
  }

  getProductById(id:string): Observable<Product>{
    return this.http.get<Product>(environment.apiUrl + '/customer/product/'+id);
  }  
}
