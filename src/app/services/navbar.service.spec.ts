import { TestBed } from '@angular/core/testing';

import { NavbarService } from './navbar.service';

describe('MenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavbarService = TestBed.get(NavbarService);
    expect(service).toBeTruthy();
  });
});
