import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFeedbackComponent } from './app-feedback.component';

describe('AppFeedbackComponent', () => {
  let component: AppFeedbackComponent;
  let fixture: ComponentFixture<AppFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
