import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLookupComponent } from './list-lookup.component';

describe('ListLookupComponent', () => {
  let component: ListLookupComponent;
  let fixture: ComponentFixture<ListLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
