import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreClosureComponent } from './pre-closure.component';

describe('PreClosureComponent', () => {
  let component: PreClosureComponent;
  let fixture: ComponentFixture<PreClosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreClosureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
