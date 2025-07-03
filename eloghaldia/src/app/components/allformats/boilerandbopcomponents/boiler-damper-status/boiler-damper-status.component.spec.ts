import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerDamperStatusComponent } from './boiler-damper-status.component';

describe('BoilerDamperStatusComponent', () => {
  let component: BoilerDamperStatusComponent;
  let fixture: ComponentFixture<BoilerDamperStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoilerDamperStatusComponent]
    });
    fixture = TestBed.createComponent(BoilerDamperStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
