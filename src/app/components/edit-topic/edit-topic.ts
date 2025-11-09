import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-edit-topic',
  imports: [],
  templateUrl: './edit-topic.html',
  styleUrl: './edit-topic.css',
})
export class EditTopic {
  isModalOpen = input<boolean>(false);
  closeModal = output<boolean>();

  isDarkMode = input.required<boolean>();

  closeEditModal() {
    this.closeModal.emit(false);
  }
}
