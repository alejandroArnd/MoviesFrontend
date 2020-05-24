import { TestBed } from '@angular/core/testing';

import { CriticsmovieService } from './criticsmovie.service';

describe('CriticsmovieService', () => {
  let service: CriticsmovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriticsmovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
