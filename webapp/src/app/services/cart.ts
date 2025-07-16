import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { CartItem } from '../types/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  http = inject(HttpClient);
  cart: CartItem[] = [];

  init() {
    return this.getCartItems().subscribe((result) => {
      this.cart = result;
    });
  }

  getCartItems() {
    return this.http.get<CartItem[]>(environment.apiUrl + '/customer/carts');
  }

  addToCarts(productId:string, quantity:number) {
    return this.http.post(environment.apiUrl + '/customer/carts/'+ productId,{ quantity: quantity});
  }

  removeFromCarts(productId:string) {
    return this.http.delete(environment.apiUrl + '/customer/carts/'+ productId);
  }
}
