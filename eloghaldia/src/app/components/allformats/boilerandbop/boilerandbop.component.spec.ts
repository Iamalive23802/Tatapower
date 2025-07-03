import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerandbopComponent } from './boilerandbop.component';

describe('BoilerandbopComponent', () => {
  let component: BoilerandbopComponent;
  let fixture: ComponentFixture<BoilerandbopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoilerandbopComponent]
    });
    fixture = TestBed.createComponent(BoilerandbopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
