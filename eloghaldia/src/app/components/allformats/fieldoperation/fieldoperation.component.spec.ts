import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldoperationComponent } from './fieldoperation.component';

describe('FieldoperationComponent', () => {
  let component: FieldoperationComponent;
  let fixture: ComponentFixture<FieldoperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldoperationComponent]
    });
    fixture = TestBed.createComponent(FieldoperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
