import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftactivitiessiComponent } from './shiftactivitiessi.component';

describe('ShiftactivitiessiComponent', () => {
  let component: ShiftactivitiessiComponent;
  let fixture: ComponentFixture<ShiftactivitiessiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShiftactivitiessiComponent]
    });
    fixture = TestBed.createComponent(ShiftactivitiessiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
