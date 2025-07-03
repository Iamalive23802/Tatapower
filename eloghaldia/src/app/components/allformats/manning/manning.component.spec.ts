import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManningComponent } from './manning.component';

describe('ManningComponent', () => {
  let component: ManningComponent;
  let fixture: ComponentFixture<ManningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManningComponent]
    });
    fixture = TestBed.createComponent(ManningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
