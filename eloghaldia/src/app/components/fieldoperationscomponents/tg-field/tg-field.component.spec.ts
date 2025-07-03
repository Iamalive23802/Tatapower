import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgFieldComponent } from './tg-field.component';

describe('TgFieldComponent', () => {
  let component: TgFieldComponent;
  let fixture: ComponentFixture<TgFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TgFieldComponent]
    });
    fixture = TestBed.createComponent(TgFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
