import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginOrderComponent } from './begin-order.component';

describe('BeginOrderComponent', () => {
  let component: BeginOrderComponent;
  let fixture: ComponentFixture<BeginOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeginOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
