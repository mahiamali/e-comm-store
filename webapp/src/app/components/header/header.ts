import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CustomerService } from '../../services/customer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  customerService = inject(CustomerService);
  categoryList: Category[] = [];
  router = inject(Router);
  authService = inject(AuthService);
  searchTerm!:string;

  ngOnInit() {
    this.searchTerm = "";
    this.customerService.getCategories().subscribe((result) => {
      this.categoryList = result;
    });
  }

  onSearch(event: any) {
    if (event.target.value) {
      this.router.navigateByUrl('/products?search=' + event.target.value);
    }
  }

  searchCategory(id: string | undefined) {
    this.searchTerm = "";
    this.router.navigateByUrl('/products?categoryid=' + id);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
