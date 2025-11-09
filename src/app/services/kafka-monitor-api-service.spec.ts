import { TestBed } from '@angular/core/testing';

import { KafkaMonitorApiService } from './kafka-monitor-api-service';

describe('KafkaMonitorApiService', () => {
  let service: KafkaMonitorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KafkaMonitorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
