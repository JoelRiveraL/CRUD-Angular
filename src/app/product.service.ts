import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface ProductToAdd {
    id?: any;
    name: string;
    price: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:3000/products';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
    }

    getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    addProduct(product: ProductToAdd): Observable<Product> {
        return this.getProducts().pipe(
            switchMap(products => {
                const lastProduct = products.length ? products[products.length - 1] : null;
                const newId = lastProduct ? (parseInt(lastProduct?.id.toString()) + 1).toString() : 1;
                const productWithId: ProductToAdd = { ...product, id: newId.toString(), price: Number(product.price)};
                return this.http.post<Product>(this.apiUrl, productWithId);
            })
        );
    }

    updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
    }

    deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}