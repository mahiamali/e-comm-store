import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { ToastService } from './services/toast';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, RouterModule, Header, Footer, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'webapp';

  constructor(private router: Router, public toastService: ToastService) {}

  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.smoothScrollToTop();
      }
    });
  }

  smoothScrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
