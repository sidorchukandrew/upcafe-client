import { TestBed } from '@angular/core/testing';

import { CatalogEditService } from './catalog-edit.service';

describe('CatalogEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatalogEditService = TestBed.get(CatalogEditService);
    expect(service).toBeTruthy();
  });
});
