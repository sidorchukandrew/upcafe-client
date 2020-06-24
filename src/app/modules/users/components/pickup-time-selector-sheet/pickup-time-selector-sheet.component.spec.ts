import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupTimeSelectorSheetComponent } from './pickup-time-selector-sheet.component';

describe('PickupTimeSelectorSheetComponent', () => {
  let component: PickupTimeSelectorSheetComponent;
  let fixture: ComponentFixture<PickupTimeSelectorSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupTimeSelectorSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupTimeSelectorSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
