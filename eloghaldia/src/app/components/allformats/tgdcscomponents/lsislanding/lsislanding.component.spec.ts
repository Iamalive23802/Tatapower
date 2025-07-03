import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsislandingComponent } from './lsislanding.component';

describe('LsislandingComponent', () => {
  let component: LsislandingComponent;
  let fixture: ComponentFixture<LsislandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LsislandingComponent]
    });
    fixture = TestBed.createComponent(LsislandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
