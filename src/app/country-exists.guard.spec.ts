import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { countryExistsGuard } from './country-exists.guard';

describe('countryExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => countryExistsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
