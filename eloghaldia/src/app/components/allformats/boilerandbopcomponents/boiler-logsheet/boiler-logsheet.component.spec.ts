import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerLogsheetComponent } from './boiler-logsheet.component';

describe('BoilerLogsheetComponent', () => {
  let component: BoilerLogsheetComponent;
  let fixture: ComponentFixture<BoilerLogsheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoilerLogsheetComponent]
    });
    fixture = TestBed.createComponent(BoilerLogsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
