import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsheetTgZeroUnit1Component } from './logsheet-tg-zero-unit1.component';

describe('LogsheetTgZeroUnit1Component', () => {
  let component: LogsheetTgZeroUnit1Component;
  let fixture: ComponentFixture<LogsheetTgZeroUnit1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsheetTgZeroUnit1Component]
    });
    fixture = TestBed.createComponent(LogsheetTgZeroUnit1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
