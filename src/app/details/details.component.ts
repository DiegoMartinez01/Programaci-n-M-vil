// src/app/pages/product-detail/product-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ToastController } from '@ionic/angular';
import { Product } from 'model/Product';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  product: Product = { id: 0, title: '', category: '', description: '', image: '', price: 0 };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : NaN;
    if (isNaN(id)) {
      console.error('Invalid product ID');
      return;
    }
    this.productService.getProductById(id).subscribe(
      product => this.product = product,
      error => {
        console.error('Error fetching product', error);
      }
    );
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.showToast('Product added to cart');
    } else {
      console.error('No product available to add to cart');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
