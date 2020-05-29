import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulUpdateDialogComponent } from './successful-update-dialog.component';

describe('SuccessfulUpdateDialogComponent', () => {
  let component: SuccessfulUpdateDialogComponent;
  let fixture: ComponentFixture<SuccessfulUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
