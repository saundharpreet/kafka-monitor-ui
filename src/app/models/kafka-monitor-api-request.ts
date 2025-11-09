export class KafkaMonitorApiRequestVersion1 {
  topicName: string;
  consumerGroup: string;

  constructor(topicName: string, consumerGroup: string) {
    this.topicName = topicName;
    this.consumerGroup = consumerGroup;
  }
}

export enum ConsumerState {
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
  STOPPING = 'STOPPING',
  STARTING = 'STARTING',
  DELETING = 'DELETING',
}

export class TopicEntity {
  topicName?: string;
  consumerGroup?: string;
  consumerState?: ConsumerState;
}

export class TopicDataEntity {
  topicName?: string;
  consumerGroup?: string;
  partition?: string;
  offset?: string;
  timestamp?: string;
  headers?: { [key: string]: string };
  payload?: string;
}
