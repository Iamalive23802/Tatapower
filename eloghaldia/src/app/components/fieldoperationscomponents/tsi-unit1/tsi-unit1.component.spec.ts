import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsiUnit1Component } from './tsi-unit1.component';

describe('TsiUnit1Component', () => {
  let component: TsiUnit1Component;
  let fixture: ComponentFixture<TsiUnit1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TsiUnit1Component]
    });
    fixture = TestBed.createComponent(TsiUnit1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
