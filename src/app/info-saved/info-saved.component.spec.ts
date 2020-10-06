import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSavedComponent } from './info-saved.component';

describe('InfoSavedComponent', () => {
  let component: InfoSavedComponent;
  let fixture: ComponentFixture<InfoSavedComponent>;

  beforeEach(async(() => {
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
