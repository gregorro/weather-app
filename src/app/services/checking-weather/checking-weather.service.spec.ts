import { TestBed } from '@angular/core/testing';

import { CheckingWeatherService } from './checking-weather.service';

describe('CheckingWeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckingWeatherService = TestBed.get(CheckingWeatherService);
    expect(service).toBeTruthy();
  });
});
