import { Component, input } from '@angular/core';

@Component({
  selector: 'app-add-topic',
  imports: [],
  templateUrl: './add-topic.html',
  styleUrl: './add-topic.css',
})
export class AddTopic {
  isModalOpen = input(false);
}
