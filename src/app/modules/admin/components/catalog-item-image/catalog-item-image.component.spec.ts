import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogItemImageComponent } from './catalog-item-image.component';

describe('CatalogItemImageComponent', () => {
  let component: CatalogItemImageComponent;
  let fixture: ComponentFixture<CatalogItemImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogItemImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogItemImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
