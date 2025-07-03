import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  http = inject(HttpClient);
  wishlist: Product[] = [];

  init() {
    return this.getWishlists().subscribe((result) => {
      this.wishlist = result;
    });
  }

  getWishlists() {
    return this.http.get<Product[]>(environment.apiUrl + '/customer/wishlists');
  }

  addToWishlists(productId:string) {
    return this.http.post(environment.apiUrl + '/customer/wishlists/'+ productId,{});
  }

  removeFromWishlists(productId:string) {
    return this.http.delete(environment.apiUrl + '/customer/wishlists/'+ productId);
  }
}
