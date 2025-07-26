import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist';
import { CartService } from '../../services/cart';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink, NgClass],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: Product;
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  toastService = inject(ToastService);

  // cart = new Set<string>();

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
        this.toastService.showToast(`Removed from wishlist : ${product.name}`, 3000, 'error');
    } else {
      this.wishlistService.addToWishlists(product._id!).subscribe((result) => {
        this.wishlistService.init();
      });
      this.toastService.showToast(`Added to wishlist : ${product.name}`, 3000, 'success');
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

  addToCart(event: Event, product: any): void {
    event.stopPropagation();

    this.cartService.addToCarts(product._id!, 1).subscribe((result) => {
      this.cartService.init();
    });
    this.toastService.showToast(`Added to cart : ${product.name}`, 3000, 'success');
  }

  isInCart(product: Product): boolean {
    let isProduct = this.cartService.cart.find(
      (x) => x.product._id == product._id
    );
    if (isProduct) {
      return true;
    } else {
      return false;
    }
  }

  removeFromCart(event: Event, product: any): void {
    event.stopPropagation();

    this.cartService.removeFromCarts(product._id!).subscribe((result) => {
      this.cartService.init();
    });
    this.toastService.showToast(`Removed from cart : ${product.name}`, 3000, 'error');
  }
}
