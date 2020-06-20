import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierListSummaryComponent } from './modifier-list-summary.component';

describe('ModifierListSummaryComponent', () => {
  let component: ModifierListSummaryComponent;
  let fixture: ComponentFixture<ModifierListSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierListSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierListSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
