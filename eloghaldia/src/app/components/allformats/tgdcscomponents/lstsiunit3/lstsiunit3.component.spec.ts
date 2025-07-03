import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lstsiunit3Component } from './lstsiunit3.component';

describe('Lstsiunit3Component', () => {
  let component: Lstsiunit3Component;
  let fixture: ComponentFixture<Lstsiunit3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Lstsiunit3Component]
    });
    fixture = TestBed.createComponent(Lstsiunit3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
