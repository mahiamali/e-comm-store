import { Component, Input } from '@angular/core';
import { Product } from '../../types/product';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink, NgClass],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: Product;

  wishlist: Set<string> = new Set();
  cart = new Set<string>();

  get sellingPrice() {
    return Math.round(
      this.product.price - (this.product.price * this.product.discount) / 100
    );
  }

  addToWishlist(event: Event, product: any): void {
    event.stopPropagation(); // Prevent routerLink trigger
    console.log('Wishlist clicked:', product.name);
    // Integrate your service or state management here
    const productId = product._id;

    if (this.wishlist.has(productId)) {
      this.wishlist.delete(productId);
    } else {
      this.wishlist.add(productId);
    }
  }

  isInWishlist(product: any): boolean {
    return this.wishlist.has(product._id);
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
