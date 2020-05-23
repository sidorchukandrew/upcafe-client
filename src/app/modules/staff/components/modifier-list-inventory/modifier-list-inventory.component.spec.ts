import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierListInventoryComponent } from './modifier-list-inventory.component';

describe('ModifierListInventoryComponent', () => {
  let component: ModifierListInventoryComponent;
  let fixture: ComponentFixture<ModifierListInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierListInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierListInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
