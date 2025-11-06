import { Component, effect, input, OnInit } from '@angular/core';
import { EditTopic } from '../edit-topic/edit-topic';

@Component({
  selector: 'app-main',
  imports: [EditTopic],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit {
  isDarkMode = input.required<boolean>();
  isEditMode = input.required<boolean>();

  editModeModalOpen: boolean = false;

  statusSource = '/assets/check-light.svg';

  constructor() {
    effect(() => {
      this.statusSource = this.isDarkMode() ? '/assets/check-dark.svg' : '/assets/check-light.svg';
    });
  }

  jsonString: string = `{"result": [{"message": "Hello, Bulah! Your order number is: #70.Hello, Bulah! Your order number is: #70.Hello, Bulah! Your order number is: #70.Hello, Bulah! Your order number is: #70.","phoneNumber": "663.723.8711 x00477","phoneVariation": "+90 356 283 10 62","status": "active","name": {"first": "Aidan","middle": "Gray","last": "Carter"},"username": "Aidan-Carter","password": "YpU95puwGCJCHRd","emails": ["Golden_Will@gmail.com","Joel.Dickens@example.com"],"location": {"street": "77059 Crooks Cape","city": "New Eileen","state": "Connecticut","country": "United Arab Emirates","zip": "39434-6170","coordinates": {"latitude": "9.1112","longitude": "-41.6839"}},"website": "https://perfect-stallion.biz/","domain": "untidy-shop.net","job": {"title": "Dynamic Identity Engineer","descriptor": "Senior","area": "Paradigm","type": "Producer","company": "O'Reilly - Bogan"},"creditCard": {"number": "5516-1362-4641-8501","cvv": "637","issuer": "diners_club"},"uuid": "feb33e42-2568-43bf-85a6-002c74339c8f","objectId": "690a43b626e961dac4c95bcf"}]}`;
  formattedJson: string = '';

  ngOnInit() {
    this.formattedJson = JSON.stringify(JSON.parse(this.jsonString), null, 4);
  }

  openEditModeModal() {
    this.editModeModalOpen = true;
  }

  closeEditModeModal() {
    this.editModeModalOpen = false;
  }
}
