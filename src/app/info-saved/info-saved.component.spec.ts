import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoSavedComponent } from './info-saved.component';

describe('InfoSavedComponent', () => {
  let component: InfoSavedComponent;
  let fixture: ComponentFixture<InfoSavedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
