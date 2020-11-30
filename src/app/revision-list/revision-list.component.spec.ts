import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RevisionListComponent } from './revision-list.component';

describe('RevisionListComponent', () => {
  let component: RevisionListComponent;
  let fixture: ComponentFixture<RevisionListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
