import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BopLogsheetComponent } from './bop-logsheet.component';

describe('BopLogsheetComponent', () => {
  let component: BopLogsheetComponent;
  let fixture: ComponentFixture<BopLogsheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BopLogsheetComponent]
    });
    fixture = TestBed.createComponent(BopLogsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
