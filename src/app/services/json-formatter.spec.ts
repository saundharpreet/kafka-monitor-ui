import { TestBed } from '@angular/core/testing';

import { JsonFormatter } from './json-formatter';

describe('JsonFormatter', () => {
  let service: JsonFormatter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonFormatter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
