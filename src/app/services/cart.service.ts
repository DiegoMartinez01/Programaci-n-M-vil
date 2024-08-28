// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'model/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();

  addToCart(product: Product) {
    const currentCart = this.cart.value;
    this.cart.next([...currentCart, product]);
  }

  removeFromCart(productId: number) {
    const updatedCart = this.cart.value.filter(p => p.id !== productId);
    this.cart.next(updatedCart);
  }

  clearCart() {
    this.cart.next([]);
  }
}
