import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink, NgClass],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: Product;
  wishlistService = inject(WishlistService);

  cart = new Set<string>();

  get sellingPrice() {
    return Math.round(
      this.product.price - (this.product.price * this.product.discount) / 100
    );
  }

  addToWishlist(event: Event, product: Product): void {
    event.stopPropagation(); // Prevent routerLink trigger
    // console.log('Wishlist clicked:', product.name);

    if (this.isInWishlist(product)) {
      this.wishlistService
        .removeFromWishlists(product._id!)
        .subscribe((result) => {
          this.wishlistService.init();
        });
    } else {
      this.wishlistService.addToWishlists(product._id!).subscribe((result) => {
        this.wishlistService.init();
      });
    }
  }

  isInWishlist(product: Product): boolean {
    let isProduct = this.wishlistService.wishlist.find(
      (x) => x._id == product._id
    );
    if (isProduct) {
      return true;
    } else {
      return false;
    }
  }

  toggleCart(event: Event, product: any): void {
    event.stopPropagation();

    const id = product._id;
    if (this.cart.has(id)) {
      this.cart.delete(id);
    } else {
      this.cart.add(id);
    }
  }

  isInCart(product: any): boolean {
    return this.cart.has(product._id);
  }
}
