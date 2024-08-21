import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { mockProduct } from '../mock/product.mock';

describe('[ProductsService]', () => {
  const baseAPI = environment.baseAPI;
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getProducts', () => {
    service.getProducts().subscribe();
    const req = httpController.expectOne(`${baseAPI}products`)
    expect(req.request.method).toEqual('GET');
  });

  it('should test saveProducts', () => {
    service.saveProduct(mockProduct).subscribe();
    const req = httpController.expectOne(`${baseAPI}products`)
    expect(req.request.method).toEqual('POST');
  });

  it('should test deleteProduct', () => {
    const id = 3;
    service.deleteProduct(id).subscribe();
    const req = httpController.expectOne(`${baseAPI}products/${id}`)
    expect(req.request.method).toEqual('DELETE');
  });

  it('should test updateProduct', () => {
    service.updateProduct(mockProduct).subscribe();
    const req = httpController.expectOne(`${baseAPI}products/${mockProduct.id}`)
    expect(req.request.method).toEqual('PUT');
  });
});
