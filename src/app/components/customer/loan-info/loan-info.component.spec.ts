import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanInfoComponent } from './loan-info.component';

describe('LoanInfoComponent', () => {
  let component: LoanInfoComponent;
  let fixture: ComponentFixture<LoanInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
