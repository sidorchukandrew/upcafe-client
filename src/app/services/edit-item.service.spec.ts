import { TestBed } from '@angular/core/testing';

import { EditItemService } from './edit-item.service';

describe('EditItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditItemService = TestBed.get(EditItemService);
    expect(service).toBeTruthy();
  });
});
