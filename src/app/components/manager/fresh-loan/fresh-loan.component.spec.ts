import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshLoanComponent } from './fresh-loan.component';

describe('FreshLoanComponent', () => {
  let component: FreshLoanComponent;
  let fixture: ComponentFixture<FreshLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreshLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreshLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
