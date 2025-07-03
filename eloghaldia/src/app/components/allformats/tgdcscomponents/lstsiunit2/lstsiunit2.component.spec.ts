import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lstsiunit2Component } from './lstsiunit2.component';

describe('Lstsiunit2Component', () => {
  let component: Lstsiunit2Component;
  let fixture: ComponentFixture<Lstsiunit2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Lstsiunit2Component]
    });
    fixture = TestBed.createComponent(Lstsiunit2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
