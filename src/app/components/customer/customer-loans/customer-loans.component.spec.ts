import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoansComponent } from './customer-loans.component';

describe('CustomerLoansComponent', () => {
  let component: CustomerLoansComponent;
  let fixture: ComponentFixture<CustomerLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
