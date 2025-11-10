import { Component, effect, inject, input, OnInit } from '@angular/core';
import { EditTopic } from '../edit-topic/edit-topic';
import { KafkaMonitorApiService } from '../../services/kafka-monitor-api-service';
import { TopicDataEntity, TopicEntity } from '../../models/kafka-monitor-api-request';
import { JsonFormatter } from '../../services/json-formatter';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [EditTopic, JsonFormatter, DatePipe],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit {
  isDarkMode = input.required<boolean>();
  isEditMode = input.required<boolean>();

  editModeModalOpen: boolean = false;

  statusSource = '/assets/check-light.svg';

  kafkaMonitorApiService: KafkaMonitorApiService = inject(KafkaMonitorApiService);

  topicEntities: TopicEntity[] = [];
  topicDataList: TopicDataEntity[] | null = null;
  topicData: TopicDataEntity | null = null;

  refreshedTopicDataList: TopicDataEntity[] | null = null;

  selectedTopicIndex: number = 0;
  topicDataIndex: number = 0;

  noPreviousIndex: string = '';
  noNextIndex: string = '';

  constructor() {
    effect(() => {
      this.statusSource = this.isDarkMode() ? '/assets/check-dark.svg' : '/assets/check-light.svg';
    });
  }

  ngOnInit() {
    this.loadTopics();
    setInterval(() => this.refreshTopicData(), 10000);
  }

  loadTopics() {
    this.kafkaMonitorApiService.getAllTopics().subscribe({
      next: (topics) => {
        this.topicEntities = topics;

        const currentSelectedTopic = localStorage.getItem('selectedTopic');
        let currentSelectedTopicIndex = 0;

        if (currentSelectedTopic) {
          this.topicEntities.forEach((entity, index) => {
            if (entity.topicName == currentSelectedTopic) {
              currentSelectedTopicIndex = index;
            }
          });
        }

        this.selectTopic(currentSelectedTopicIndex);
      },
      error: (error) => {
        console.error('Error fetching topics:', error);
      },
    });
  }

  loadTopicData() {
    const selectedTopic = this.topicEntities[this.selectedTopicIndex];
    if (!selectedTopic) {
      return;
    }

    this.kafkaMonitorApiService.getTopicData(selectedTopic.topicName!).subscribe({
      next: (data) => {
        this.topicDataList = data;
        this.topicDataIndex = data.length - 1;
        this.topicData = this.topicDataList[this.topicDataIndex];
      },
      error: (error) => {
        console.error('Error fetching topic data:', error);
      },
    });
  }

  refreshTopicData() {
    this.kafkaMonitorApiService
      .getTopicData(this.topicEntities[this.selectedTopicIndex].topicName!)
      .subscribe({
        next: (data) => {
          if (this.topicDataList) {
            const currentLastRecord = this.topicDataList[this.topicDataList.length - 1];
            const newLastRecord = data[data.length - 1];

            if (
              currentLastRecord.timestamp == newLastRecord.timestamp ||
              currentLastRecord.payload == newLastRecord.payload
            ) {
              this.refreshedTopicDataList = null;
            } else {
              this.refreshedTopicDataList = data;
            }
          }
        },
        error: (error) => {
          console.error('Error refreshing topic data:', error);
        },
      });
  }

  onRefreshDataClick() {
    this.topicDataList = this.refreshedTopicDataList;
    this.topicDataIndex = this.refreshedTopicDataList!.length - 1;
    this.topicData = this.topicDataList![this.topicDataIndex];
    this.refreshedTopicDataList = null;
  }

  selectTopic(index: number) {
    this.selectedTopicIndex = index;
    localStorage.setItem('selectedTopic', this.topicEntities[index].topicName!);
    this.loadTopicData();
  }

  previousIndex() {
    if (this.topicDataIndex > 0) {
      this.topicDataIndex--;
      this.topicData = this.topicDataList ? this.topicDataList[this.topicDataIndex] : null;
    } else {
      this.noPreviousIndex = 'Already at the first message.';
      setTimeout(() => (this.noPreviousIndex = ''), 1000);
    }
  }

  nextIndex() {
    if (this.topicDataList && this.topicDataIndex < this.topicDataList.length - 1) {
      this.topicDataIndex++;
      this.topicData = this.topicDataList[this.topicDataIndex];
    } else {
      this.noNextIndex = 'Already at the last message.';
      setTimeout(() => (this.noNextIndex = ''), 1000);
    }
  }

  showHeaders() {
    const messageHeaders = this.topicData?.headers;
    alert(JSON.stringify(messageHeaders));
  }

  openEditModeModal() {
    this.editModeModalOpen = true;
  }

  closeEditModeModal() {
    this.editModeModalOpen = false;
  }
}
