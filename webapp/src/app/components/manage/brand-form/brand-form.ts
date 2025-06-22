import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand';

@Component({
  selector: 'app-brand-form',
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './brand-form.html',
  styleUrl: './brand-form.scss',
})
export class BrandForm {
  brandName!: string;

  brandService = inject(BrandService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false;
  id!: string;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // console.log(id);
    if (this.id) {
      this.isEdit = true;
      this.brandService.getBrandsByID(this.id).subscribe((result) => {
        console.log(result);
        this.brandName = result.name;
      });
    }
  }

  add() {
    // console.log(this.brandName);
    this.brandService.addBrand(this.brandName).subscribe((result: any) => {
      alert('Brand Added!');
      this.router.navigateByUrl('/admin/brands');
    });
  }

  update() {
    // console.log(this.brandName);
    this.brandService
      .updateBrand(this.id, this.brandName)
      .subscribe((result: any) => {
        alert('Brand Updated!');
        this.router.navigateByUrl('/admin/brands');
      });
  }
}
