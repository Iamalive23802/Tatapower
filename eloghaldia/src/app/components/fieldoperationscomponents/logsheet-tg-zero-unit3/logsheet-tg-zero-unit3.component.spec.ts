import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsheetTgZeroUnit3Component } from './logsheet-tg-zero-unit3.component';

describe('LogsheetTgZeroUnit3Component', () => {
  let component: LogsheetTgZeroUnit3Component;
  let fixture: ComponentFixture<LogsheetTgZeroUnit3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsheetTgZeroUnit3Component]
    });
    fixture = TestBed.createComponent(LogsheetTgZeroUnit3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
