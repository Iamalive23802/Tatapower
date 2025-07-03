import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftactivitiesComponent } from './shiftactivities.component';

describe('ShiftactivitiesComponent', () => {
  let component: ShiftactivitiesComponent;
  let fixture: ComponentFixture<ShiftactivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShiftactivitiesComponent]
    });
    fixture = TestBed.createComponent(ShiftactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
