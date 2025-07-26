import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';
import { RouterLink } from '@angular/router';
import { Product } from '../../types/product';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-shopping-cart',
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss',
})
export class ShoppingCart {
  cartService = inject(CartService);
  toastService = inject(ToastService);

  get CartItems() {
    return this.cartService.cart;
  }

  ngOnInit() {
    this.cartService.init();
  }

  sellingPrice(product: Product) {
    return Math.round(product.price - (product.price * product.discount) / 100);
  }

  increaseQuantity(product: Product) {
    this.cartService.addToCarts(product._id!, 1).subscribe((result) => {
      this.cartService.init();
    });
    this.toastService.showToast(`Increased quantity of ${product.name}`, 3000, 'warning');
  }

  decreaseQuantity(product: Product) {
    this.cartService.addToCarts(product._id!, -1).subscribe((result) => {
      this.cartService.init();
    });
    this.toastService.showToast(`Decreased quantity of ${product.name}`, 3000, 'warning');
  }

  getTotal(): number {
    return this.cartService.cart.reduce(
      (sum, item) => sum + this.sellingPrice(item.product) * item.quantity,
      0
    );
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCarts(product._id!).subscribe((result) => {
      this.cartService.init();
    });
    this.toastService.showToast(`Removed from cart ${product.name}`, 3000, 'error');
  }
}
