import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
    id: number;
    name: string;
    price: number;
}

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {

    product: Product = { id: 0, name: '', price: 0 };

    constructor(private productService: ProductService, private router: Router) {}

    addProduct(): void {
        const productToAdd = { name: this.product.name, price: this.product.price };

        this.productService.addProduct(productToAdd).subscribe(
        () => {
            this.router.navigate(['/']);
        },
        error => {
            console.error('Error al agregar el producto:', error);
        }
        );
    }
}