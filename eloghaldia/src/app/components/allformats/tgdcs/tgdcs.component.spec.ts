import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgdcsComponent } from './tgdcs.component';

describe('TgdcsComponent', () => {
  let component: TgdcsComponent;
  let fixture: ComponentFixture<TgdcsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TgdcsComponent]
    });
    fixture = TestBed.createComponent(TgdcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
