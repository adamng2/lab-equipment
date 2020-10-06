import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionalFormComponent } from './dimensional-form.component';

describe('DimensionalFormComponent', () => {
  let component: DimensionalFormComponent;
  let fixture: ComponentFixture<DimensionalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimensionalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
