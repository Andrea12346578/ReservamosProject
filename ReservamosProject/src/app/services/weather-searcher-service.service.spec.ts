import { TestBed } from '@angular/core/testing';

import { WeatherSearcherServiceService } from './weather-searcher-service.service';

describe('WeatherSearcherServiceService', () => {
  let service: WeatherSearcherServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherSearcherServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
