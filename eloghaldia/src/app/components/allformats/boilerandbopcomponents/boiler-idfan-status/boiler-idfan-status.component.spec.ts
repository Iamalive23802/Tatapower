import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerIdfanStatusComponent } from './boiler-idfan-status.component';

describe('BoilerIdfanStatusComponent', () => {
  let component: BoilerIdfanStatusComponent;
  let fixture: ComponentFixture<BoilerIdfanStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoilerIdfanStatusComponent]
    });
    fixture = TestBed.createComponent(BoilerIdfanStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
