import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsiUnit3Component } from './tsi-unit3.component';

describe('TsiUnit3Component', () => {
  let component: TsiUnit3Component;
  let fixture: ComponentFixture<TsiUnit3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TsiUnit3Component]
    });
    fixture = TestBed.createComponent(TsiUnit3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
