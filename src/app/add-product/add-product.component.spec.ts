import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { delay, of, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockProduct } from '../mock/product.mock';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';

fdescribe('[AddProductComponent]', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let dialogRef: MatDialogRef<AddProductComponent>;
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'updateProduct',
    'saveProduct',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [HttpClientTestingModule, MatDialogModule, MatButtonModule],
      providers: [
        ProductsService,
        MatSnackBar,
        {
          provide: MatDialogRef,
          useValue: dialogRef
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
      teardown: { destroyAfterEach: true }
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    mockProductService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy()
  });

  it('should init the form', () => {
    expect(component.productForm.get('title')?.value).toEqual('');
    expect(component.productForm.get('description')?.value).toEqual('');
    expect(component.productForm.get('price')?.value).toEqual('');
    expect(component.productForm.get('category')?.value).toEqual('');
  });

  describe('should test add product functionality', () => {
    it('should call the saveProduct to add new product', () => {
      mockProductService.saveProduct.and.returnValue(of(mockProduct).pipe(delay(1)));

      component.productForm.patchValue(mockProduct);
      component.saveProduct();

      expect(mockProductService.updateProduct).toHaveBeenCalledWith(mockProduct);
      expect(matSnackBar.open).toHaveBeenCalledWith('Added Successfully!...', '', {
        duration: 3000
      });
    });

    it('should test the saveProduct for failure while add a new product', () => {
      const error = Error('Error');
      mockProductService.saveProduct.and.returnValue((throwError(() => error)));

      component.productForm.patchValue(mockProduct);
      component.saveProduct();

      expect(mockProductService.updateProduct).toHaveBeenCalledWith(mockProduct);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
        duration: 3000
      });
    });
  });

  describe('should test edit product functionality', () => {
    it('should set the form controls to the correct values when data is provided', () => { });

    it('should call the saveProduct while editing the product', () => {
      mockProductService.updateProduct.and.returnValue(of(mockProduct).pipe(delay(1)));

      component.data = mockProduct;
      component.productForm.patchValue(mockProduct);
      component.saveProduct();

      expect(mockProductService.updateProduct).toHaveBeenCalledWith(mockProduct);
      expect(matSnackBar.open).toHaveBeenCalledWith('Updated Successfully!...', '', {
        duration: 3000
      });

    });

    it('should test the saveProduct for failure while update a product', () => {
      const data: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category'
      };
      const error = new Error("erro");
      component.data = data;

      mockProductService.updateProduct.and.returnValue((throwError(() => new Error('erro'))));
      component.productForm.patchValue(data);
      component.saveProduct();

      expect(mockProductService.updateProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
        duration: 3000
      });
    });
  });
});
