import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConsigComponent } from './product-consig.component';

describe('ProductConsigComponent', () => {
  let component: ProductConsigComponent;
  let fixture: ComponentFixture<ProductConsigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductConsigComponent]
    });
    fixture = TestBed.createComponent(ProductConsigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
