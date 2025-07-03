import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '../product-card/product-card';
import { WishlistService } from '../../services/wishlist';

@Component({
  selector: 'app-product-detail',
  imports: [NgClass, CurrencyPipe, FormsModule, ProductCard],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  product!: Product;
  similerProducts: Product[] = [];
  wishlistService = inject(WishlistService);

  cart = new Set<string>();

  constructor() {
    // const productID = this.route.snapshot.params['id'];
    this.route.params.subscribe((x: any) => {
      this.getProductDetails(x.id);
    });
  }

  getProductDetails(id: string) {
    this.customerService.getProductById(id).subscribe((result) => {
      console.log(result);
      this.product = result;

      this.customerService
        .getProducts('', this.product.categoryId, '', '', -1, 1, 4)
        .subscribe((result) => {
          this.similerProducts = result.data.filter((x) => x._id != id);
        });
    });
  }

  selectedImageIndex = 0;
  quantity = 1;

  // Mock review data
  reviews = [
    {
      reviewer: 'Jatin Shah',
      rating: 5,
      comment:
        'Excellent product! The picture quality is superb and sound is very clear.',
    },
    {
      reviewer: 'Rohit K.',
      rating: 4,
      comment:
        'Very good TV. Setup was easy, UI is clean, and delivery was quick.',
    },
  ];

  newReview = {
    reviewer: '',
    rating: 5,
    comment: '',
  };

  get averageRating(): number {
    if (!this.reviews.length) return 0;
    const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
    return parseFloat((sum / this.reviews.length).toFixed(1));
  }

  selectRating(star: number) {
    this.newReview.rating = star;
  }

  submitReview() {
    if (this.newReview.reviewer && this.newReview.comment) {
      this.reviews.unshift({ ...this.newReview });
      this.newReview = { reviewer: '', rating: 5, comment: '' };
    }
  }

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
