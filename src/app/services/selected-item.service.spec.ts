import { TestBed } from '@angular/core/testing';

import { SelectedItemService } from './selected-item.service';

describe('SelectedItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedItemService = TestBed.get(SelectedItemService);
    expect(service).toBeTruthy();
  });
});
