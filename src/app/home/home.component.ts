import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from 'model/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    console.log('Loading products...');
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        console.log('Products loaded:', products); // Muestra los productos cargados
      },
      error => console.error('Error fetching products', error)
    );
  }

  loadCategories() {
    console.log('Loading categories...');
    this.productService.getCategories().subscribe(
      (categories: string[]) => {
        this.categories = categories;
        console.log('Categories loaded:', categories);
      },
      error => console.error('Error fetching categories', error)
    );
  }

  filterByCategory(category: string) {
    console.log('Filtering by category:', category);
    this.selectedCategory = category;
    this.productService.getProductsByCategory(category).subscribe(
      (products: Product[]) => {
        this.products = products;
        console.log('Filtered products:', products);
      },
      error => console.error('Error fetching products by category', error)
    );
  }

  goToProductDetail(productId: number) {
    console.log('Navigating to product detail:', productId);
    this.router.navigate(['/details', productId]);
  }
}
