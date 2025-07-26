import { Injectable } from '@angular/core';
export type ToastType = 'success' | 'error' | 'warning';

@Injectable({ providedIn: 'root' })
export class ToastService {
  public message = '';
  public show = false;
  public type: ToastType = 'success';
  public progress = 100;
  private interval: any;

  showToast(message: string, duration: number = 3000, type: ToastType = 'success'): void {
    this.message = message;
    this.type = type;
    this.show = true;
    this.progress = 100;

    const step = 100 / (duration / 100);
    clearInterval(this.interval);

    this.interval = setInterval(() => {
      this.progress -= step;
      if (this.progress <= 0) {
        this.dismissToast();
      }
    }, 100);
  }

  dismissToast(): void {
    this.show = false;
    clearInterval(this.interval);
    this.progress = 100;
  }
}
