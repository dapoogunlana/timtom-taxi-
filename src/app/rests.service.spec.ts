import { TestBed } from '@angular/core/testing';

import { RestsService } from './rests.service';

describe('RestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestsService = TestBed.get(RestsService);
    expect(service).toBeTruthy();
  });
});
