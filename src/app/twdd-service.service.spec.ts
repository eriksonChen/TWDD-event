/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TwddServiceService } from './twdd-service.service';

describe('TwddServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwddServiceService]
    });
  });

  it('should ...', inject([TwddServiceService], (service: TwddServiceService) => {
    expect(service).toBeTruthy();
  }));
});
