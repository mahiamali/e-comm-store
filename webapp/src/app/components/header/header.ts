import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  categoryService = inject(CategoryService);
  categoryList: Category[] = [];
  router = inject(Router);

  ngOnInit() {
    this.categoryService.getCategories().subscribe((result) => {
      this.categoryList = result;
    });
  }

  onSearch(event: any) {
    if (event.target.value) {
      this.router.navigateByUrl('/products?search=' + event.target.value);
    }
  }

  searchCategory(id: string | undefined) {
    this.router.navigateByUrl('/products?categoryid=' + id);
  }
}
