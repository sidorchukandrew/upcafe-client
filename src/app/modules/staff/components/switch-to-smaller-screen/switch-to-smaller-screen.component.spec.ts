import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchToSmallerScreenComponent } from './switch-to-smaller-screen.component';

describe('SwitchToSmallerScreenComponent', () => {
  let component: SwitchToSmallerScreenComponent;
  let fixture: ComponentFixture<SwitchToSmallerScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchToSmallerScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchToSmallerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
