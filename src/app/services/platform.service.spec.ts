import { PlatformService } from "./platform.service";
import { BreakpointObserver } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';

describe('PlatformService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [PlatformService]
    });
  });

  it('should only call the breakpoint observe method once', () => {
    pending();
  });
});
