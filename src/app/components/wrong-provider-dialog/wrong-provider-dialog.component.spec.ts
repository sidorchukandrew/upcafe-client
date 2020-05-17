import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongProviderDialog } from './wrong-provider-dialog.component';

describe('WrongProviderDialogComponent', () => {
  let component: WrongProviderDialog;
  let fixture: ComponentFixture<WrongProviderDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WrongProviderDialog],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongProviderDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
