import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsSheetComponent } from './user-details-sheet.component';

describe('UserDetailsSheetComponent', () => {
  let component: UserDetailsSheetComponent;
  let fixture: ComponentFixture<UserDetailsSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
