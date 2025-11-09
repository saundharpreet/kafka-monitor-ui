import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  KafkaMonitorApiRequestVersion1,
  TopicEntity,
  TopicDataEntity,
} from '../models/kafka-monitor-api-request';

@Injectable({
  providedIn: 'root',
})
export class KafkaMonitorApiService {
  private readonly baseUrl = 'http://localhost:8080';

  http: HttpClient = inject(HttpClient);

  createTopicConsumer(request: KafkaMonitorApiRequestVersion1): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/v1/create`, request);
  }

  getAllTopics(): Observable<TopicEntity[]> {
    return this.http.get<TopicEntity[]>(`${this.baseUrl}/v1/topics`);
  }

  getTopicData(topicName: string): Observable<TopicDataEntity[]> {
    return this.http.get<TopicDataEntity[]>(`${this.baseUrl}/v1/topic/data/${topicName}`);
  }

  deleteTopicConsumer(request: KafkaMonitorApiRequestVersion1): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/v1/delete`, { body: request });
  }
}
