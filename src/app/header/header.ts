import { Component, OnInit, output, signal } from '@angular/core';
import { AddTopic } from "../add-topic/add-topic";
import { single } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [AddTopic],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  isDarkMode: boolean = false;
  darkModeSignal = output<boolean>();

  isAddModalOpen: boolean = false;

  isEditMode: boolean = false;
  isEditModeSignal = output<boolean>();

  ngOnInit(): void {
    const savedMode = localStorage.getItem('darkMode');
    this.isDarkMode = savedMode === 'true';
    this.darkModeSignal.emit(this.isDarkMode);
  }

  onToggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.darkModeSignal.emit(this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode ? 'true' : 'false');
  }

  openAddModal() {
    this.isAddModalOpen = true;
  }

  closeAddModal() {
    this.isAddModalOpen = false;
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.isEditModeSignal.emit(this.isEditMode);
  }
}
