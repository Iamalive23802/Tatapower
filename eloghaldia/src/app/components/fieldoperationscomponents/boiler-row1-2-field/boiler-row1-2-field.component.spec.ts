import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerRow12FieldComponent } from './boiler-row1-2-field.component';

describe('BoilerRow12FieldComponent', () => {
  let component: BoilerRow12FieldComponent;
  let fixture: ComponentFixture<BoilerRow12FieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoilerRow12FieldComponent]
    });
    fixture = TestBed.createComponent(BoilerRow12FieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
