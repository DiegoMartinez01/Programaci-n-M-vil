import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from 'model/Product';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private toastController: ToastController) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((sum, product) => sum + product.price, 0);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.showToast('Product removed from cart');
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  pay() {
    this.cartService.clearCart();
    this.showToast('Payment simulated and cart cleared');
  }
}
