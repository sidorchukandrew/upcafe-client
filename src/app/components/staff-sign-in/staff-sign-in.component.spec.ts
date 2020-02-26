import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSignInComponent } from './staff-sign-in.component';

describe('StaffSignInComponent', () => {
  let component: StaffSignInComponent;
  let fixture: ComponentFixture<StaffSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
