import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerHpdpAgitatorComponent } from './boiler-hpdp-agitator.component';

describe('BoilerHpdpAgitatorComponent', () => {
  let component: BoilerHpdpAgitatorComponent;
  let fixture: ComponentFixture<BoilerHpdpAgitatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoilerHpdpAgitatorComponent]
    });
    fixture = TestBed.createComponent(BoilerHpdpAgitatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
