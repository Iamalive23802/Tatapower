import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lstgunit2Component } from './lstgunit2.component';

describe('Lstgunit2Component', () => {
  let component: Lstgunit2Component;
  let fixture: ComponentFixture<Lstgunit2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Lstgunit2Component]
    });
    fixture = TestBed.createComponent(Lstgunit2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
