import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  constructor() {}

  getProducts() {
    return this.http.get<Product[]>(environment.apiUrl + '/product');
  }
  
  getProductByID(id: string) {
    return this.http.get<Product>(environment.apiUrl + '/product/' + id);
  }

  addProduct(product: any) {
    return this.http.post(environment.apiUrl + '/product', product);
  }

  updateProduct(id: string, product: any) {
    return this.http.put(environment.apiUrl + '/product/' + id, product);
  }

  deleteProductByID(id: string) {
    return this.http.delete(environment.apiUrl + '/product/' + id);
  }
}
