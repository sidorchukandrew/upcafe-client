import { TestBed } from '@angular/core/testing';

import { HoursService } from './hours.service';

describe('TimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HoursService = TestBed.get(HoursService);
    expect(service).toBeTruthy();
  });
});
