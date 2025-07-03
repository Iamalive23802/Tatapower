import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsheetElectricalEqComponent } from './logsheet-electrical-eq.component';

describe('LogsheetElectricalEqComponent', () => {
  let component: LogsheetElectricalEqComponent;
  let fixture: ComponentFixture<LogsheetElectricalEqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsheetElectricalEqComponent]
    });
    fixture = TestBed.createComponent(LogsheetElectricalEqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
