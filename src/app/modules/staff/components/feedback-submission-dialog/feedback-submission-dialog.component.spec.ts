import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSubmissionDialogComponent } from './feedback-submission-dialog.component';

describe('FeedbackSubmissionDialogComponent', () => {
  let component: FeedbackSubmissionDialogComponent;
  let fixture: ComponentFixture<FeedbackSubmissionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackSubmissionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackSubmissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
