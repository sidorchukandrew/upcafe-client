import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountMenuComponent } from './admin-account-menu.component';

describe('AdminAccountMenuComponent', () => {
  let component: AdminAccountMenuComponent;
  let fixture: ComponentFixture<AdminAccountMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAccountMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccountMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
