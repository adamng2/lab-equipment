import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricalFormComponent } from './electrical-form.component';

describe('ElectricalFormComponent', () => {
  let component: ElectricalFormComponent;
  let fixture: ComponentFixture<ElectricalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
