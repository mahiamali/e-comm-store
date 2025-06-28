import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [NgClass, CurrencyPipe, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  product!: Product;

  ngOnInit() {
    const productID = this.route.snapshot.params['id'];
    this.customerService.getProductById(productID).subscribe((result) => {
      // console.log(result);
      this.product = result;
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
}
