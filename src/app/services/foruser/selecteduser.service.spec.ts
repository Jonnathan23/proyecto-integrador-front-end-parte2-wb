import { TestBed } from '@angular/core/testing';

import { SelecteduserService } from './selecteduser.service';

describe('SelecteduserService', () => {
  let service: SelecteduserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelecteduserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
