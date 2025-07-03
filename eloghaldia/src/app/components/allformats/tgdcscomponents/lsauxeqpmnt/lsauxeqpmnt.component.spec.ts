import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsauxeqpmntComponent } from './lsauxeqpmnt.component';

describe('LsauxeqpmntComponent', () => {
  let component: LsauxeqpmntComponent;
  let fixture: ComponentFixture<LsauxeqpmntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LsauxeqpmntComponent]
    });
    fixture = TestBed.createComponent(LsauxeqpmntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
