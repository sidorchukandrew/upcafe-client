import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAccountMenuComponent } from './staff-account-menu.component';

describe('StaffAccountMenuComponent', () => {
  let component: StaffAccountMenuComponent;
  let fixture: ComponentFixture<StaffAccountMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffAccountMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAccountMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
