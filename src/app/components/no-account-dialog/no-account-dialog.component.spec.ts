import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAccountDialogComponent } from './no-account-dialog.component';

describe('NoAccountDialogComponent', () => {
  let component: NoAccountDialogComponent;
  let fixture: ComponentFixture<NoAccountDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoAccountDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
