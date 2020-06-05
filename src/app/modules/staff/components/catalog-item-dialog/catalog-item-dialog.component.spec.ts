import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogItemDialogComponent } from './catalog-item-dialog.component';

describe('CatalogItemDialogComponent', () => {
  let component: CatalogItemDialogComponent;
  let fixture: ComponentFixture<CatalogItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
