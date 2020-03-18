import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModListDetailsComponent } from './mod-list-details.component';

describe('ModListDetailsComponent', () => {
  let component: ModListDetailsComponent;
  let fixture: ComponentFixture<ModListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
