import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeSettingsMenuComponent } from './cafe-settings-menu.component';

describe('CafeSettingsMenuComponent', () => {
  let component: CafeSettingsMenuComponent;
  let fixture: ComponentFixture<CafeSettingsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CafeSettingsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeSettingsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
