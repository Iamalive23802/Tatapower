import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsheetTgCommonComponent } from './logsheet-tg-common.component';

describe('LogsheetTgCommonComponent', () => {
  let component: LogsheetTgCommonComponent;
  let fixture: ComponentFixture<LogsheetTgCommonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsheetTgCommonComponent]
    });
    fixture = TestBed.createComponent(LogsheetTgCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
