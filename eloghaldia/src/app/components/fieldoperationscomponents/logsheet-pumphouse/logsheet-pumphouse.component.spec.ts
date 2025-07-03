import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsheetPumphouseComponent } from './logsheet-pumphouse.component';

describe('LogsheetPumphouseComponent', () => {
  let component: LogsheetPumphouseComponent;
  let fixture: ComponentFixture<LogsheetPumphouseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsheetPumphouseComponent]
    });
    fixture = TestBed.createComponent(LogsheetPumphouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
