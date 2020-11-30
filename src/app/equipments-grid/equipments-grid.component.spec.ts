import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EquipmentsGridComponent } from './equipments-grid.component';

describe('EquipmentsGridComponent', () => {
  let component: EquipmentsGridComponent;
  let fixture: ComponentFixture<EquipmentsGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
