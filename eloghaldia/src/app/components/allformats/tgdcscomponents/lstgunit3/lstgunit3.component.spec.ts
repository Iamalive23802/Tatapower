import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lstgunit3Component } from './lstgunit3.component';

describe('Lstgunit3Component', () => {
  let component: Lstgunit3Component;
  let fixture: ComponentFixture<Lstgunit3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Lstgunit3Component]
    });
    fixture = TestBed.createComponent(Lstgunit3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
