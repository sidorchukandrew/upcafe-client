import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInOptionsComponent } from './sign-in-options.component';

describe('SignInOptionsComponent', () => {
  let component: SignInOptionsComponent;
  let fixture: ComponentFixture<SignInOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
