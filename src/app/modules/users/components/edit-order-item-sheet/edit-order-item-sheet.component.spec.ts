import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderItemSheetComponent } from './edit-order-item-sheet.component';

describe('EditOrderItemSheetComponent', () => {
  let component: EditOrderItemSheetComponent;
  let fixture: ComponentFixture<EditOrderItemSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrderItemSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderItemSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
