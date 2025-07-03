import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsheetTgZeroUnit2Component } from './logsheet-tg-zero-unit2.component';

describe('LogsheetTgZeroUnit2Component', () => {
  let component: LogsheetTgZeroUnit2Component;
  let fixture: ComponentFixture<LogsheetTgZeroUnit2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsheetTgZeroUnit2Component]
    });
    fixture = TestBed.createComponent(LogsheetTgZeroUnit2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
