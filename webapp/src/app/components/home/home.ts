import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer';
import { Product } from '../../types/product';
import { ProductCard } from '../product-card/product-card';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule, ProductCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  customerService = inject(CustomerService);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
  bannerImages: Product[] = [];

  constructor(config: NgbCarouselConfig) {
		// customize default values of carousels used by this component tree
		config.interval = 10000;
		config.wrap = false;
		config.keyboard = false;
		config.pauseOnHover = true;
	}

  ngOnInit() {
    this.customerService.getNewProducts().subscribe((result) => {
      this.newProducts = result;
      this.bannerImages.push(...result);
    });

    this.customerService.getFeaturedProducts().subscribe((result) => {
      this.featuredProducts = result;
      this.bannerImages.push(...result);
    });
  }
}
