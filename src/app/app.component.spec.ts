import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
@Component({
  selector: 'app-nav-bar',
  template: `<div></div>`,
})
class MockNavBarComponent { }

@Component({
  selector: 'app-products',
  template: `<div></div>`,
})
class MockProductsComponent { }

describe('[AppComponent]', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockNavBarComponent, MockProductsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have app-nav-bar', () => {
    const element = fixture.debugElement.nativeElement.querySelector('app-nav-bar');
    expect(element).toBeTruthy();
  });

  it('should have app-products', () => {
    const element = fixture.debugElement.nativeElement.querySelector('app-products');
    expect(element).toBeTruthy();
  });

  it('should test sum of two numbers', () => {
    const result = component.add(3, 4);
    expect(result).toEqual(7);
  });
});
