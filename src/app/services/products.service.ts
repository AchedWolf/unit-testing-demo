import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseAPI = environment.baseAPI;
  constructor(private http: HttpClient) { }

  /*
   *  Função dedicada a buscar produtos
   */
  getProducts() {
    return this.http.get<Product[]>(`${this.baseAPI}products`);
  }

  /*
   *  Função dedicada a salvar um novo produto
   */
  saveProduct(product: Product) {
    return this.http.post<Product>(
      `${this.baseAPI}products`,
      product
    );
  }

  /*
   *  Função dedicada a deletar um produto existente
   */
  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.baseAPI}products/${id}`);
  }

  /*
   *  Função dedicada a atualizar um produto existente
   */
  updateProduct(product: Product) {
    return this.http.put<Product>(
      `${this.baseAPI}products/${product.id}`,
      product
    );
  }
}
