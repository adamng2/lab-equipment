import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EquipmentListComponent } from './equipment-list.component';

describe('EquipmentListComponent', () => {
  let component: EquipmentListComponent;
  let fixture: ComponentFixture<EquipmentListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
