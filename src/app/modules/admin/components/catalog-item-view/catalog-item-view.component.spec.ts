import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogItemViewComponent } from './catalog-item-view.component';

describe('CatalogItemViewComponent', () => {
  let component: CatalogItemViewComponent;
  let fixture: ComponentFixture<CatalogItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
