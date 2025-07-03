import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsheetBoilerRow12Component } from './logsheet-boiler-row1-2.component';

describe('LogsheetBoilerRow12Component', () => {
  let component: LogsheetBoilerRow12Component;
  let fixture: ComponentFixture<LogsheetBoilerRow12Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsheetBoilerRow12Component]
    });
    fixture = TestBed.createComponent(LogsheetBoilerRow12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
