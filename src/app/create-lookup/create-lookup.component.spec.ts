import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLookupComponent } from './create-lookup.component';

describe('CreateLookupComponent', () => {
  let component: CreateLookupComponent;
  let fixture: ComponentFixture<CreateLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
