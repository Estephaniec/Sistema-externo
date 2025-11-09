import { TestBed } from '@angular/core/testing';

import * as ApiModule from './api';

describe('Api', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    const ApiClass = (ApiModule as any).Api || (ApiModule as any).default;
    service = TestBed.inject(ApiClass);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

