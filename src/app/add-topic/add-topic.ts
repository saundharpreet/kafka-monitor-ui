import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-add-topic',
  imports: [],
  templateUrl: './add-topic.html',
  styleUrl: './add-topic.css',
})
export class AddTopic {
  isModalOpen = input<boolean>(false);
  closeModal = output<boolean>();

  isDarkMode = input.required<boolean>();

  closeAddModal() {
    this.closeModal.emit(false);
  }
}
