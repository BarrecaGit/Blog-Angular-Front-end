import { TestBed } from '@angular/core/testing';

import { AuthG } from './auth-g.service';

describe('AuthG', () => {
  let service: AuthG;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthG);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
