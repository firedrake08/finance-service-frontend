import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothecationComponent } from './hypothecation.component';

describe('HypothecationComponent', () => {
  let component: HypothecationComponent;
  let fixture: ComponentFixture<HypothecationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HypothecationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothecationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
