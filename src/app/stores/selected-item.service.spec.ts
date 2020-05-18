import { TestBed } from '@angular/core/testing';

import { SelectedItemStore } from './selected-item.store';

describe('SelectedItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedItemStore = TestBed.get(SelectedItemStore);
    expect(service).toBeTruthy();
  });
});
