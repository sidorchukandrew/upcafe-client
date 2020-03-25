import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SweetsComponent } from './sweets.component';

describe('SweetsComponent', () => {
  let component: SweetsComponent;
  let fixture: ComponentFixture<SweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SweetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
