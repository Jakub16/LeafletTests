import { TestBed } from '@angular/core/testing';

import { MarkerClusterService } from './marker-cluster.service';

describe('MarkerClusterService', () => {
  let service: MarkerClusterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkerClusterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
