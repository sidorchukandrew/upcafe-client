import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSelectionGroupComponent } from './single-selection-group.component';

describe('SingleSelectionGroupComponent', () => {
  let component: SingleSelectionGroupComponent;
  let fixture: ComponentFixture<SingleSelectionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSelectionGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSelectionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
