import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemSummaryComponent } from './menu-item-summary.component';

describe('MenuItemSummaryComponent', () => {
  let component: MenuItemSummaryComponent;
  let fixture: ComponentFixture<MenuItemSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
