import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsiUnit2Component } from './tsi-unit2.component';

describe('TsiUnit2Component', () => {
  let component: TsiUnit2Component;
  let fixture: ComponentFixture<TsiUnit2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TsiUnit2Component]
    });
    fixture = TestBed.createComponent(TsiUnit2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
