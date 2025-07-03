import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lstgunit1Component } from './lstgunit1.component';

describe('Lstgunit1Component', () => {
  let component: Lstgunit1Component;
  let fixture: ComponentFixture<Lstgunit1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Lstgunit1Component]
    });
    fixture = TestBed.createComponent(Lstgunit1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
