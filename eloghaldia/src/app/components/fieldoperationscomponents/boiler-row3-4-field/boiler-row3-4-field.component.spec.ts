import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerRow34FieldComponent } from './boiler-row3-4-field.component';

describe('BoilerRow34FieldComponent', () => {
  let component: BoilerRow34FieldComponent;
  let fixture: ComponentFixture<BoilerRow34FieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoilerRow34FieldComponent]
    });
    fixture = TestBed.createComponent(BoilerRow34FieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
