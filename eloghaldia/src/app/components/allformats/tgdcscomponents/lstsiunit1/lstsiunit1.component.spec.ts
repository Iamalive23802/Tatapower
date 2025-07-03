import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lstsiunit1Component } from './lstsiunit1.component';

describe('Lstsiunit1Component', () => {
  let component: Lstsiunit1Component;
  let fixture: ComponentFixture<Lstsiunit1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Lstsiunit1Component]
    });
    fixture = TestBed.createComponent(Lstsiunit1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
