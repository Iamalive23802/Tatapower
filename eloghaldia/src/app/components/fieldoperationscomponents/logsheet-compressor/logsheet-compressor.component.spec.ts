import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsheetCompressorComponent } from './logsheet-compressor.component';

describe('LogsheetCompressorComponent', () => {
  let component: LogsheetCompressorComponent;
  let fixture: ComponentFixture<LogsheetCompressorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsheetCompressorComponent]
    });
    fixture = TestBed.createComponent(LogsheetCompressorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
