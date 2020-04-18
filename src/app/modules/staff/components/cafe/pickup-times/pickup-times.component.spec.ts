import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupTimesComponent } from './pickup-times.component';

describe('PickupTimesComponent', () => {
  let component: PickupTimesComponent;
  let fixture: ComponentFixture<PickupTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
